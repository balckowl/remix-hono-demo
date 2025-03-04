import { createRoute, z } from "@hono/zod-openapi";
import { blogIdSchema, createBlogSchema, selectBlogSchema, selectBlogsSchema } from "server/models/blogSchemas";

export const getBlogsRoute = createRoute({
  path: "/",
  method: "get",
  description: "全ブログの取得",
  responses: {
    200: {
      description: "取得成功",
      content: {
        "application/json": {
          schema: selectBlogsSchema
        }
      }
    }
  }
})

export const getBlogRoute = createRoute({
  path: "/{id}",
  method: "get",
  description: "個別ブログ取得",
  request: {
    params: blogIdSchema
  },
  responses: {
    200: {
      description: "取得成功",
      content: { "application/json": { schema: selectBlogSchema } }
    },
    404: {
      description: "ブログが見つかりませんでした。",
      content: { "application/json": { schema: z.null() } }
    }
  }
})

export const createBlogRoute = createRoute({
  method: "post",
  path: "/",
  description: "投稿",
  request: {
    body: {
      content: {
        "application/json": {
          schema: createBlogSchema
        }
      }
    }
  },
  responses: {
    201: {
      description: "取得成功",
      content: { "application/json": { schema: selectBlogSchema } }
    },
  }
})
