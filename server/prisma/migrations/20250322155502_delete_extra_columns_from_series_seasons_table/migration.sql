/*
  Warnings:

  - You are about to drop the column `description` on the `series_seasons` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `series_seasons` table. All the data in the column will be lost.
  - You are about to drop the column `youtube_trailer_id` on the `series_seasons` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "series_seasons" DROP COLUMN "description",
DROP COLUMN "title",
DROP COLUMN "youtube_trailer_id";
