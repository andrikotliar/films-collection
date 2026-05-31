ALTER TABLE "public"."films" ALTER COLUMN style DROP DEFAULT;
ALTER TABLE "public"."films" ALTER COLUMN style TYPE text;
DROP TYPE "public"."title_style";--> statement-breakpoint
CREATE TYPE "public"."title_style" AS ENUM('LIVE_ACTION', 'ANIMATION');
ALTER TABLE "public"."films" ALTER COLUMN style TYPE "public"."title_style" USING style::title_style;
ALTER TABLE "public"."films" ALTER COLUMN style SET DEFAULT 'LIVE_ACTION';
