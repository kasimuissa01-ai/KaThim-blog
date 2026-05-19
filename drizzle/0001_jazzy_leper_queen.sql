CREATE TABLE `brand_voice` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`niche` varchar(255),
	`target_audience` text,
	`tone` varchar(100),
	`content_pillars` text,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `brand_voice_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `connected_platforms` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`platform_name` enum('Instagram','TikTok','X','LinkedIn') NOT NULL,
	`username` varchar(255),
	`is_active` int NOT NULL DEFAULT 1,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `connected_platforms_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `content_library` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`content_id` int NOT NULL,
	`tags` text,
	`status` enum('draft','scheduled','published') NOT NULL DEFAULT 'draft',
	`scheduled_date` timestamp,
	`published_date` timestamp,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `content_library_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `daily_briefings` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`recommended_topics` text,
	`posting_times` text,
	`content_suggestions` text,
	`engagement_predictions` text,
	`generated_at` timestamp NOT NULL DEFAULT (now()),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `daily_briefings_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `generated_content` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`trend_id` int,
	`platform` enum('Instagram','TikTok','X','LinkedIn') NOT NULL,
	`content_type` enum('post','script','caption','hashtags') NOT NULL,
	`content_text` text NOT NULL,
	`hook_text` text,
	`body_text` text,
	`cta_text` text,
	`status` enum('draft','scheduled','published') NOT NULL DEFAULT 'draft',
	`scheduled_date` timestamp,
	`published_date` timestamp,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `generated_content_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `trends` (
	`id` int AUTO_INCREMENT NOT NULL,
	`keyword` varchar(255) NOT NULL,
	`platform` enum('Instagram','TikTok','X','LinkedIn','General') NOT NULL,
	`growth_rate` int DEFAULT 0,
	`volume` int DEFAULT 0,
	`category` varchar(100),
	`related_keywords` text,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`expires_at` timestamp,
	CONSTRAINT `trends_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `brand_voice` ADD CONSTRAINT `brand_voice_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `connected_platforms` ADD CONSTRAINT `connected_platforms_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `content_library` ADD CONSTRAINT `content_library_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `content_library` ADD CONSTRAINT `content_library_content_id_generated_content_id_fk` FOREIGN KEY (`content_id`) REFERENCES `generated_content`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `daily_briefings` ADD CONSTRAINT `daily_briefings_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `generated_content` ADD CONSTRAINT `generated_content_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `generated_content` ADD CONSTRAINT `generated_content_trend_id_trends_id_fk` FOREIGN KEY (`trend_id`) REFERENCES `trends`(`id`) ON DELETE set null ON UPDATE no action;