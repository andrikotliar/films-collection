-- AlterTable
ALTER TABLE "public"."films" ADD COLUMN     "most_watched" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "watched_in_cinema" BOOLEAN NOT NULL DEFAULT false;
