/*
  Warnings:

  - A unique constraint covering the columns `[award_id,title]` on the table `nominations` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "nominations_award_id_title_key" ON "public"."nominations"("award_id", "title");
