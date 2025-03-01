import { RouteHandler } from "@hono/zod-openapi";
import { db } from "db";
import { blogsTable } from "db/schema";
import { eq } from "drizzle-orm";
import { getBlogRoute, getBlogsRoute } from "server/routes/blogRoutes";

export const getBlogsHandler: RouteHandler<typeof getBlogsRoute> = async (c) => {
  const blogs = await db.select().from(blogsTable)
  return c.json(blogs, 200)
}

export const getBlogHandler: RouteHandler<typeof getBlogRoute> = async (c) => {
  const { id } = c.req.param()
  const blog = await db.select().from(blogsTable).where(eq(blogsTable.id, Number(id)));

  if (!blog[0]) {
    return c.json(null, 404)
  }

  return c.json(blog[0], 200)
}
