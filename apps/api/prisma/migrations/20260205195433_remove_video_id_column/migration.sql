/*
  Warnings:

  - You are about to drop the column `video_id` on the `film_trailers` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[film_id,url]` on the table `film_trailers` will be added. If there are existing duplicate values, this will fail.
  - Made the column `url` on table `film_trailers` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "public"."film_trailers_film_id_video_id_key";

-- AlterTable
ALTER TABLE "public"."film_trailers" DROP COLUMN "video_id",
ALTER COLUMN "url" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "film_trailers_film_id_url_key" ON "public"."film_trailers"("film_id", "url");
