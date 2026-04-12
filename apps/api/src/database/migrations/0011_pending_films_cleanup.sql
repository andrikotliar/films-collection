ALTER TABLE "pending_films" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "pending_films" CASCADE;--> statement-breakpoint
ALTER TABLE "films" ALTER COLUMN "release_date" DROP NOT NULL;