/*
  Warnings:

  - You are about to drop the column `page_url` on the `page_content` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "page_content" DROP COLUMN "page_url",
ADD COLUMN     "page_key" TEXT;
