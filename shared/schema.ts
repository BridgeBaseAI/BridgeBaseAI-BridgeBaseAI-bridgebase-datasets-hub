import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const datasets = pgTable("datasets", {
  id: varchar("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  source: text("source").notNull(),
  tags: text("tags").array().notNull(),
  updateFrequency: text("update_frequency").notNull(),
  volume: text("volume").notNull(),
  category: text("category").notNull(),
  status: text("status").notNull().default("live"),
  createdAt: timestamp("created_at").default(sql`now()`),
});

export const aiQueries = pgTable("ai_queries", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  context: text("context"),
  confidence: text("confidence"),
  sources: text("sources").array(),
  createdAt: timestamp("created_at").default(sql`now()`),
});

export const insertDatasetSchema = createInsertSchema(datasets).pick({
  id: true,
  title: true,
  description: true,
  source: true,
  tags: true,
  updateFrequency: true,
  volume: true,
  category: true,
  status: true,
});

export const insertAiQuerySchema = createInsertSchema(aiQueries).pick({
  question: true,
  context: true,
});

export type InsertDataset = z.infer<typeof insertDatasetSchema>;
export type Dataset = typeof datasets.$inferSelect;
export type InsertAiQuery = z.infer<typeof insertAiQuerySchema>;
export type AiQuery = typeof aiQueries.$inferSelect;

// API response types
export const aiResponseSchema = z.object({
  answer: z.string(),
  sources: z.array(z.string()).optional(),
  confidence: z.number().optional(),
});

export type AiResponse = z.infer<typeof aiResponseSchema>;
