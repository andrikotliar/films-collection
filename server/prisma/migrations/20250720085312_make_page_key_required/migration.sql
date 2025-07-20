/*
  Warnings:

  - Made the column `page_key` on table `page_content` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "page_content" ALTER COLUMN "page_key" SET NOT NULL;
