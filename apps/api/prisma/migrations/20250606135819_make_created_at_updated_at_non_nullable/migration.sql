/*
  Warnings:

  - Made the column `created_at` on table `awards` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `awards` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `collection_events` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `collection_events` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `collections` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `collections` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `countries` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `countries` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `film_award_nominations` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `film_award_nominations` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `film_cast` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `film_cast` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `film_chapter_keys` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `film_chapter_keys` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `film_crew` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `film_crew` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `film_trailers` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `film_trailers` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `films_collections` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `films_collections` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `films_countries` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `films_countries` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `films_genres` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `films_genres` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `films_studios` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `films_studios` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `genres` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `genres` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `nominations` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `nominations` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `people` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `people` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `series_extensions` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `series_extensions` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `studios` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `studios` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "awards" ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "updated_at" SET NOT NULL;

-- AlterTable
ALTER TABLE "collection_events" ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "updated_at" SET NOT NULL;

-- AlterTable
ALTER TABLE "collections" ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "updated_at" SET NOT NULL;

-- AlterTable
ALTER TABLE "countries" ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "updated_at" SET NOT NULL;

-- AlterTable
ALTER TABLE "film_award_nominations" ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "updated_at" SET NOT NULL;

-- AlterTable
ALTER TABLE "film_cast" ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "updated_at" SET NOT NULL;

-- AlterTable
ALTER TABLE "film_chapter_keys" ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "updated_at" SET NOT NULL;

-- AlterTable
ALTER TABLE "film_crew" ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "updated_at" SET NOT NULL;

-- AlterTable
ALTER TABLE "film_trailers" ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "updated_at" SET NOT NULL;

-- AlterTable
ALTER TABLE "films_collections" ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "updated_at" SET NOT NULL;

-- AlterTable
ALTER TABLE "films_countries" ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "updated_at" SET NOT NULL;

-- AlterTable
ALTER TABLE "films_genres" ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "updated_at" SET NOT NULL;

-- AlterTable
ALTER TABLE "films_studios" ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "updated_at" SET NOT NULL;

-- AlterTable
ALTER TABLE "genres" ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "updated_at" SET NOT NULL;

-- AlterTable
ALTER TABLE "nominations" ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "updated_at" SET NOT NULL;

-- AlterTable
ALTER TABLE "people" ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "updated_at" SET NOT NULL;

-- AlterTable
ALTER TABLE "series_extensions" ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "updated_at" SET NOT NULL;

-- AlterTable
ALTER TABLE "studios" ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "updated_at" SET NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "updated_at" SET NOT NULL;
