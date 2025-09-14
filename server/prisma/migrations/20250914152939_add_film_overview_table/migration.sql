/*
  Warnings:

  - You are about to drop the column `description` on the `films` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "films" DROP COLUMN "description";

-- CreateTable
CREATE TABLE "film_overview" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "film_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "film_overview_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "film_overview_film_id_key" ON "film_overview"("film_id");

-- AddForeignKey
ALTER TABLE "film_overview" ADD CONSTRAINT "film_overview_film_id_fkey" FOREIGN KEY ("film_id") REFERENCES "films"("id") ON DELETE CASCADE ON UPDATE CASCADE;
