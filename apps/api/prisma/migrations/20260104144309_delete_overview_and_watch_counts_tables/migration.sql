/*
  Warnings:

  - You are about to drop the `film_overview` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `film_watch_counts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."film_overview" DROP CONSTRAINT "film_overview_film_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."film_watch_counts" DROP CONSTRAINT "film_watch_counts_film_id_fkey";

-- AlterTable
ALTER TABLE "public"."films" ADD COLUMN     "overview" TEXT,
ADD COLUMN     "watch_count" INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE "public"."film_overview";

-- DropTable
DROP TABLE "public"."film_watch_counts";
