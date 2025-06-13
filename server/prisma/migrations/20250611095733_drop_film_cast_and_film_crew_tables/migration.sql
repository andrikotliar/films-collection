/*
  Warnings:

  - You are about to drop the `film_cast` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `film_crew` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "film_cast" DROP CONSTRAINT "film_cast_film_id_fkey";

-- DropForeignKey
ALTER TABLE "film_cast" DROP CONSTRAINT "film_cast_person_id_fkey";

-- DropForeignKey
ALTER TABLE "film_crew" DROP CONSTRAINT "film_crew_film_id_fkey";

-- DropForeignKey
ALTER TABLE "film_crew" DROP CONSTRAINT "film_crew_person_id_fkey";

-- DropTable
DROP TABLE "film_cast";

-- DropTable
DROP TABLE "film_crew";

-- DropEnum
DROP TYPE "crew_position";
