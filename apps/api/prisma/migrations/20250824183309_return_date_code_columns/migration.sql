/*
  Warnings:

  - You are about to drop the column `start_date` on the `collection_events` table. All the data in the column will be lost.
  - The `end_date` column on the `collection_events` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "collection_events" DROP COLUMN "start_date",
ADD COLUMN     "start_date_code" INTEGER,
DROP COLUMN "end_date",
ADD COLUMN     "end_date" INTEGER;
