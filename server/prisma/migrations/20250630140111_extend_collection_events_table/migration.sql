-- AlterTable
ALTER TABLE "collection_events" ADD COLUMN     "background" JSONB,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "end_date" INTEGER,
ADD COLUMN     "end_month" INTEGER,
ADD COLUMN     "start_date" INTEGER,
ADD COLUMN     "start_month" INTEGER,
ADD COLUMN     "year_from" INTEGER,
ALTER COLUMN "start_date_code" DROP NOT NULL,
ALTER COLUMN "end_date_code" DROP NOT NULL;
