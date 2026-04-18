ALTER TABLE "films" ALTER COLUMN "status" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "films" ALTER COLUMN "status" SET DEFAULT 'PLANNED'::text;--> statement-breakpoint
DROP TYPE "public"."film_status";--> statement-breakpoint
CREATE TYPE "public"."film_status" AS ENUM('ADDED', 'WATCHED', 'PLANNED');--> statement-breakpoint
ALTER TABLE "films" ALTER COLUMN "status" SET DEFAULT 'PLANNED'::"public"."film_status";--> statement-breakpoint
ALTER TABLE "films" ALTER COLUMN "status" SET DATA TYPE "public"."film_status" USING "status"::"public"."film_status";