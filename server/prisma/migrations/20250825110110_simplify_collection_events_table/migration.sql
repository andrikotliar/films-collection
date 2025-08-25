/*
  Warnings:

  - Made the column `year_from` on table `collection_events` required. This step will fail if there are existing NULL values in that column.
  - Made the column `title_film_id` on table `collection_events` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "collection_events" DROP CONSTRAINT "collection_events_title_film_id_fkey";

-- AlterTable
ALTER TABLE "collection_events" ALTER COLUMN "year_from" SET NOT NULL,
ALTER COLUMN "year_from" SET DEFAULT 0,
ALTER COLUMN "title_film_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "collection_events" ADD CONSTRAINT "collection_events_title_film_id_fkey" FOREIGN KEY ("title_film_id") REFERENCES "films"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
