-- DropForeignKey
ALTER TABLE "films_people" DROP CONSTRAINT "films_people_film_id_fkey";

-- DropForeignKey
ALTER TABLE "films_people" DROP CONSTRAINT "films_people_person_id_fkey";

-- AddForeignKey
ALTER TABLE "films_people" ADD CONSTRAINT "films_people_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "people"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "films_people" ADD CONSTRAINT "films_people_film_id_fkey" FOREIGN KEY ("film_id") REFERENCES "films"("id") ON DELETE CASCADE ON UPDATE CASCADE;
