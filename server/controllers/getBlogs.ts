import { RouteHandler } from "@hono/zod-openapi";
import { drizzleClient } from "db";
import { blogsTable } from "db/schema";
import { eq } from "drizzle-orm";
import { auth as authClient } from "lib/auth";
import { createBlogRoute, getBlogRoute, getBlogsRoute } from "server/routes/blogRoutes";

export const getBlogsHandler: RouteHandler<typeof getBlogsRoute, Env> = async (c) => {
  const db = drizzleClient(c.env.TURSO_CONNECTION_URL, c.env.TURSO_AUTH_TOKEN)
  const blogs = await db.select().from(blogsTable)
  return c.json(blogs, 200)
}

export const getBlogHandler: RouteHandler<typeof getBlogRoute, Env> = async (c) => {
  const { id } = c.req.param()
  const db = drizzleClient(c.env.TURSO_CONNECTION_URL, c.env.TURSO_AUTH_TOKEN)
  const blog = await db.select().from(blogsTable).where(eq(blogsTable.id, Number(id)));

  if (!blog[0]) {
    return c.json(null, 404)
  }

  return c.json(blog[0], 200)
}

export const createBlogHandler: RouteHandler<typeof createBlogRoute, Env> = async (c) => {
  const { title, content } = c.req.valid("json")
  const db = drizzleClient(c.env.TURSO_CONNECTION_URL, c.env.TURSO_AUTH_TOKEN)

  const auth = authClient(
    c.env.TURSO_CONNECTION_URL,
    c.env.TURSO_AUTH_TOKEN,
    c.env.GITHUB_CLIENT_ID,
    c.env.GITHUB_CLIENT_SECRET
  )

  console.log(c.req.raw.headers)

  const session = await auth.api.getSession({ headers: c.req.raw.headers });

  if (!session?.user?.id) {
    throw Error("ログインしてください。")
  }

  const blog = await db.insert(blogsTable).values({
    userId: session.user.id,
    title,
    content
  }).returning()

  return c.json(blog[0], 201)
}
