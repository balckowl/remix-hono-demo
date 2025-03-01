import { z } from "@hono/zod-openapi"
import { blogsTable } from "db/schema"
import { createInsertSchema } from "drizzle-zod"
import { createSelectSchema } from "drizzle-zod"

export const selectBlogSchema = createSelectSchema(blogsTable)
export const selectBlogsSchema = z.array(selectBlogSchema)
export const insertBlogSchema = createInsertSchema(blogsTable, {
  id: z.number().openapi({
    example: 1
  }),
  title: z.string().min(1, { message: "入力されていません。" }).openapi({
    example: "雑記"
  }),
  content: z.string().min(1, { message: "入力されていません。" }).openapi({
    example: "remixとhono使ってみた。"
  })
})

export const createBlogSchema = insertBlogSchema.pick({ title: true, content: true })
export const blogIdSchema = z.object({
  id: z.string().openapi({ example: "1" })
});

