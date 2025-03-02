import { OpenAPIHono } from "@hono/zod-openapi";
import { createBlogRoute, getBlogRoute, getBlogsRoute } from "./routes/blogRoutes";
import { createBlogHandler, getBlogHandler, getBlogsHandler } from "./controllers/getBlogs";
import { swaggerUI } from "@hono/swagger-ui";

export const app = new OpenAPIHono().basePath("/api");

const blogApp = new OpenAPIHono<Env>()
  .openapi(getBlogsRoute, getBlogsHandler)
  .openapi(getBlogRoute, getBlogHandler)
  .openapi(createBlogRoute, createBlogHandler)

const route = app.route("/blogs", blogApp);

app.doc("/specification", {
  openapi: "3.0.0",
  info: { title: "Honote API", version: "1.0.0" },
}).get("/doc", swaggerUI({ url: "/api/specification" }));

export type AppType = typeof route;

export default app;
