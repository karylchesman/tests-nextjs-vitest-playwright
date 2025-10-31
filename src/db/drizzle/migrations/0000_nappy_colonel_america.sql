CREATE TABLE `todos` (
	`id` text PRIMARY KEY NOT NULL,
	`description` text NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `todos_description_unique` ON `todos` (`description`);