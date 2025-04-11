import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  displayName: text("display_name"),
  avatar: text("avatar"),
  bio: text("bio"),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

// Categories table
export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
});

// Posts/rants table
export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  content: text("content").notNull(),
  excerpt: text("excerpt"),
  category_id: integer("category_id").references(() => categories.id),
  author_id: integer("author_id").references(() => users.id).notNull(),
  heat_count: integer("heat_count").default(0),
  is_nsfw: boolean("is_nsfw").default(false),
  published: boolean("published").default(false),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

// Comments table
export const comments = pgTable("comments", {
  id: serial("id").primaryKey(),
  content: text("content").notNull(),
  post_id: integer("post_id").references(() => posts.id).notNull(),
  author_id: integer("author_id").references(() => users.id).notNull(),
  parent_id: integer("parent_id").references(() => comments.id),
  rage_mode: boolean("rage_mode").default(false),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

// Gallery items
export const galleryItems = pgTable("gallery_items", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  image_url: text("image_url").notNull(),
  submitter_id: integer("submitter_id").references(() => users.id).notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

// Create insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  created_at: true
});

export const insertPostSchema = createInsertSchema(posts).omit({
  id: true,
  created_at: true,
  heat_count: true
});

export const insertCommentSchema = createInsertSchema(comments).omit({
  id: true,
  created_at: true
});

export const insertGalleryItemSchema = createInsertSchema(galleryItems).omit({
  id: true,
  created_at: true
});

export const insertCategorySchema = createInsertSchema(categories).omit({
  id: true
});

// Type definitions
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Post = typeof posts.$inferSelect;
export type InsertPost = z.infer<typeof insertPostSchema>;

export type Comment = typeof comments.$inferSelect;
export type InsertComment = z.infer<typeof insertCommentSchema>;

export type GalleryItem = typeof galleryItems.$inferSelect;
export type InsertGalleryItem = z.infer<typeof insertGalleryItemSchema>;

export type Category = typeof categories.$inferSelect;
export type InsertCategory = z.infer<typeof insertCategorySchema>;
