import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Brand Voice Configuration - stores user's brand identity and strategy
 */
export const brandVoice = mysqlTable('brand_voice', {
  id: int('id').autoincrement().primaryKey(),
  userId: int('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  niche: varchar('niche', { length: 255 }),
  targetAudience: text('target_audience'),
  tone: varchar('tone', { length: 100 }), // e.g., 'professional', 'casual', 'playful'
  contentPillars: text('content_pillars'), // JSON array of pillar names
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow().notNull(),
});

export type BrandVoice = typeof brandVoice.$inferSelect;
export type InsertBrandVoice = typeof brandVoice.$inferInsert;

/**
 * Connected Platforms - tracks which social platforms are active for each user
 */
export const connectedPlatforms = mysqlTable('connected_platforms', {
  id: int('id').autoincrement().primaryKey(),
  userId: int('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  platformName: mysqlEnum('platform_name', ['Instagram', 'TikTok', 'X', 'LinkedIn']).notNull(),
  username: varchar('username', { length: 255 }),
  isActive: int('is_active').default(1).notNull(), // 1 = true, 0 = false
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow().notNull(),
});

export type ConnectedPlatform = typeof connectedPlatforms.$inferSelect;
export type InsertConnectedPlatform = typeof connectedPlatforms.$inferInsert;

/**
 * Trends - stores trending topics fetched from external APIs
 */
export const trends = mysqlTable('trends', {
  id: int('id').autoincrement().primaryKey(),
  keyword: varchar('keyword', { length: 255 }).notNull(),
  platform: mysqlEnum('platform', ['Instagram', 'TikTok', 'X', 'LinkedIn', 'General']).notNull(),
  growthRate: int('growth_rate').default(0), // percentage
  volume: int('volume').default(0), // search volume
  category: varchar('category', { length: 100 }),
  relatedKeywords: text('related_keywords'), // JSON array
  createdAt: timestamp('created_at').defaultNow().notNull(),
  expiresAt: timestamp('expires_at'), // for cache invalidation
});

export type Trend = typeof trends.$inferSelect;
export type InsertTrend = typeof trends.$inferInsert;

/**
 * Generated Content - stores AI-generated content pieces
 */
export const generatedContent = mysqlTable('generated_content', {
  id: int('id').autoincrement().primaryKey(),
  userId: int('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  trendId: int('trend_id').references(() => trends.id, { onDelete: 'set null' }),
  platform: mysqlEnum('platform', ['Instagram', 'TikTok', 'X', 'LinkedIn']).notNull(),
  contentType: mysqlEnum('content_type', ['post', 'script', 'caption', 'hashtags']).notNull(),
  contentText: text('content_text').notNull(),
  hookText: text('hook_text'), // for scripts
  bodyText: text('body_text'), // for scripts
  ctaText: text('cta_text'), // for scripts
  status: mysqlEnum('status', ['draft', 'scheduled', 'published']).default('draft').notNull(),
  scheduledDate: timestamp('scheduled_date'),
  publishedDate: timestamp('published_date'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow().notNull(),
});

export type GeneratedContent = typeof generatedContent.$inferSelect;
export type InsertGeneratedContent = typeof generatedContent.$inferInsert;

/**
 * Content Library - saved/approved content with tags and metadata
 */
export const contentLibrary = mysqlTable('content_library', {
  id: int('id').autoincrement().primaryKey(),
  userId: int('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  contentId: int('content_id').notNull().references(() => generatedContent.id, { onDelete: 'cascade' }),
  tags: text('tags'), // JSON array of tag strings
  status: mysqlEnum('status', ['draft', 'scheduled', 'published']).default('draft').notNull(),
  scheduledDate: timestamp('scheduled_date'),
  publishedDate: timestamp('published_date'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow().notNull(),
});

export type ContentLibraryItem = typeof contentLibrary.$inferSelect;
export type InsertContentLibraryItem = typeof contentLibrary.$inferInsert;

/**
 * Daily Briefings - AI-generated daily strategy briefings
 */
export const dailyBriefings = mysqlTable('daily_briefings', {
  id: int('id').autoincrement().primaryKey(),
  userId: int('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  recommendedTopics: text('recommended_topics'), // JSON array
  postingTimes: text('posting_times'), // JSON object with platform: time
  contentSuggestions: text('content_suggestions'), // JSON array
  engagementPredictions: text('engagement_predictions'), // JSON object
  generatedAt: timestamp('generated_at').defaultNow().notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export type DailyBriefing = typeof dailyBriefings.$inferSelect;
export type InsertDailyBriefing = typeof dailyBriefings.$inferInsert;