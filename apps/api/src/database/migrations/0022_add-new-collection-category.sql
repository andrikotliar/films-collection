ALTER TYPE "public"."collection_category" ADD VALUE 'CHAPTER' BEFORE 'TOP';--> statement-breakpoint
ALTER TABLE "films_collections" ALTER COLUMN "order" SET DATA TYPE numeric;--> statement-breakpoint
ALTER TABLE "films_collections" ALTER COLUMN "order" SET NOT NULL;