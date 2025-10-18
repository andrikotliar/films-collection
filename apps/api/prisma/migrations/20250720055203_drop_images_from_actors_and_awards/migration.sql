/*
  Warnings:

  - You are about to drop the column `image` on the `awards` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `people` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "awards" DROP COLUMN "image";

-- AlterTable
ALTER TABLE "people" DROP COLUMN "image";
