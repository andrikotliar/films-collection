CREATE TYPE "public"."film_status" AS ENUM('ADDED', 'WATCHED', 'PLANNED', 'UPCOMING');--> statement-breakpoint
ALTER TABLE "films" ADD COLUMN "status" "film_status" DEFAULT 'PLANNED' NOT NULL;--> statement-breakpoint
ALTER TABLE "films" DROP COLUMN "draft";