/*
  Warnings:

  - You are about to drop the column `end_date_code` on the `collection_events` table. All the data in the column will be lost.
  - You are about to drop the column `start_date_code` on the `collection_events` table. All the data in the column will be lost.
  - Made the column `background` on table `collection_events` required. This step will fail if there are existing NULL values in that column.
  - Made the column `end_date` on table `collection_events` required. This step will fail if there are existing NULL values in that column.
  - Made the column `end_month` on table `collection_events` required. This step will fail if there are existing NULL values in that column.
  - Made the column `start_date` on table `collection_events` required. This step will fail if there are existing NULL values in that column.
  - Made the column `start_month` on table `collection_events` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "collection_events" DROP COLUMN "end_date_code",
DROP COLUMN "start_date_code",
ALTER COLUMN "background" SET NOT NULL,
ALTER COLUMN "end_date" SET NOT NULL,
ALTER COLUMN "end_month" SET NOT NULL,
ALTER COLUMN "start_date" SET NOT NULL,
ALTER COLUMN "start_month" SET NOT NULL;
