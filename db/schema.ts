import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const blogsTable = sqliteTable('blogs', {
  id: integer('id').primaryKey(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  publishedAt: text('published_at').default(sql`(CURRENT_TIMESTAMP)`).notNull()
})
