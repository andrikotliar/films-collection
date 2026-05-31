ALTER TABLE "film_chapter_keys" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "film_chapter_keys" CASCADE;--> statement-breakpoint
-- ALTER TABLE "films" DROP CONSTRAINT "films_chapter_key_fkey"; -- was deleted manually
--> statement-breakpoint
ALTER TABLE "films" DROP COLUMN "chapter_key";--> statement-breakpoint
ALTER TABLE "films" DROP COLUMN "chapter_order";