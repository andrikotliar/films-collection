/*
  Warnings:

  - You are about to drop the column `most_watched` on the `films` table. All the data in the column will be lost.
  - You are about to drop the column `watched_in_cinema` on the `films` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."films" DROP COLUMN "most_watched",
DROP COLUMN "watched_in_cinema";
