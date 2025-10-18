/*
  Warnings:

  - You are about to drop the column `character_image` on the `film_cast` table. All the data in the column will be lost.
  - You are about to drop the `series_seasons` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "series_seasons" DROP CONSTRAINT "series_seasons_series_extension_id_fkey";

-- AlterTable
ALTER TABLE "film_cast" DROP COLUMN "character_image";

-- AlterTable
ALTER TABLE "series_extensions" ADD COLUMN     "finished_at" DATE;

-- DropTable
DROP TABLE "series_seasons";
