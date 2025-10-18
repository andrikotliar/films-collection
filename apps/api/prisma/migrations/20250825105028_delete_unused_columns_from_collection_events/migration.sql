/*
  Warnings:

  - You are about to drop the column `end_month` on the `collection_events` table. All the data in the column will be lost.
  - You are about to drop the column `start_month` on the `collection_events` table. All the data in the column will be lost.
  - Made the column `start_date_code` on table `collection_events` required. This step will fail if there are existing NULL values in that column.
  - Made the column `end_date_code` on table `collection_events` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "collection_events" DROP COLUMN "end_month",
DROP COLUMN "start_month",
ALTER COLUMN "start_date_code" SET NOT NULL,
ALTER COLUMN "end_date_code" SET NOT NULL;
