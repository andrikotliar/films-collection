/*
  Warnings:

  - You are about to drop the column `end_date` on the `collection_events` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "collection_events" DROP COLUMN "end_date",
ADD COLUMN     "end_date_code" INTEGER;
