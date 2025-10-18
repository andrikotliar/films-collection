/*
  Warnings:

  - A unique constraint covering the columns `[filmId]` on the table `film_watch_counts` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `filmId` to the `film_watch_counts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "film_watch_counts" ADD COLUMN     "filmId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "film_watch_counts_filmId_key" ON "film_watch_counts"("filmId");

-- AddForeignKey
ALTER TABLE "film_watch_counts" ADD CONSTRAINT "film_watch_counts_filmId_fkey" FOREIGN KEY ("filmId") REFERENCES "films"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
