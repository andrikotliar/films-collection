-- AddForeignKey
ALTER TABLE "films" ADD CONSTRAINT "films_chapter_key_fkey" FOREIGN KEY ("chapter_key") REFERENCES "film_chapter_keys"("key") ON DELETE SET NULL ON UPDATE CASCADE;
