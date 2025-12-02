-- AlterTable
ALTER TABLE "pending_films" ADD COLUMN     "collectionId" INTEGER,
ADD COLUMN     "rating" INTEGER;

-- AddForeignKey
ALTER TABLE "pending_films" ADD CONSTRAINT "pending_films_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "collections"("id") ON DELETE SET NULL ON UPDATE CASCADE;
