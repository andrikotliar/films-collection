/*
  Warnings:

  - You are about to drop the column `background` on the `collection_events` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `collection_events` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "collection_events" DROP COLUMN "background",
DROP COLUMN "description",
ADD COLUMN     "title_film_id" INTEGER,
ALTER COLUMN "end_date" SET DATA TYPE TEXT,
ALTER COLUMN "end_month" DROP NOT NULL,
ALTER COLUMN "start_date" SET DATA TYPE TEXT,
ALTER COLUMN "start_month" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "collection_events" ADD CONSTRAINT "collection_events_title_film_id_fkey" FOREIGN KEY ("title_film_id") REFERENCES "films"("id") ON DELETE SET NULL ON UPDATE CASCADE;
