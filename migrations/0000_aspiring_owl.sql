CREATE TABLE `blogs` (
	`id` integer PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`content` text NOT NULL,
	`published_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL
);
