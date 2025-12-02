/*
  Warnings:

  - You are about to drop the column `filmId` on the `film_watch_counts` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[film_id]` on the table `film_watch_counts` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `film_id` to the `film_watch_counts` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "film_watch_counts" DROP CONSTRAINT "film_watch_counts_filmId_fkey";

-- DropIndex
DROP INDEX "film_watch_counts_filmId_key";

-- AlterTable
ALTER TABLE "film_watch_counts" DROP COLUMN "filmId",
ADD COLUMN     "film_id" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "film_watch_counts_film_id_key" ON "film_watch_counts"("film_id");

-- AddForeignKey
ALTER TABLE "film_watch_counts" ADD CONSTRAINT "film_watch_counts_film_id_fkey" FOREIGN KEY ("film_id") REFERENCES "films"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
