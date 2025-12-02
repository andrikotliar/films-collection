-- DropForeignKey
ALTER TABLE "film_award_nominations" DROP CONSTRAINT "film_award_nominations_actor_id_fkey";

-- DropForeignKey
ALTER TABLE "film_award_nominations" DROP CONSTRAINT "film_award_nominations_award_id_fkey";

-- DropForeignKey
ALTER TABLE "film_award_nominations" DROP CONSTRAINT "film_award_nominations_film_id_fkey";

-- DropForeignKey
ALTER TABLE "film_award_nominations" DROP CONSTRAINT "film_award_nominations_nomination_id_fkey";

-- DropForeignKey
ALTER TABLE "film_cast" DROP CONSTRAINT "film_cast_film_id_fkey";

-- DropForeignKey
ALTER TABLE "film_cast" DROP CONSTRAINT "film_cast_person_id_fkey";

-- DropForeignKey
ALTER TABLE "film_crew" DROP CONSTRAINT "film_crew_film_id_fkey";

-- DropForeignKey
ALTER TABLE "film_crew" DROP CONSTRAINT "film_crew_person_id_fkey";

-- DropForeignKey
ALTER TABLE "film_trailers" DROP CONSTRAINT "film_trailers_film_id_fkey";

-- DropForeignKey
ALTER TABLE "films_collections" DROP CONSTRAINT "films_collections_collection_id_fkey";

-- DropForeignKey
ALTER TABLE "films_collections" DROP CONSTRAINT "films_collections_film_id_fkey";

-- DropForeignKey
ALTER TABLE "films_countries" DROP CONSTRAINT "films_countries_country_id_fkey";

-- DropForeignKey
ALTER TABLE "films_countries" DROP CONSTRAINT "films_countries_film_id_fkey";

-- DropForeignKey
ALTER TABLE "films_genres" DROP CONSTRAINT "films_genres_film_id_fkey";

-- DropForeignKey
ALTER TABLE "films_genres" DROP CONSTRAINT "films_genres_genre_id_fkey";

-- DropForeignKey
ALTER TABLE "films_studios" DROP CONSTRAINT "films_studios_film_id_fkey";

-- DropForeignKey
ALTER TABLE "films_studios" DROP CONSTRAINT "films_studios_studio_id_fkey";

-- DropForeignKey
ALTER TABLE "nominations" DROP CONSTRAINT "nominations_award_id_fkey";

-- DropForeignKey
ALTER TABLE "series_extensions" DROP CONSTRAINT "series_extensions_film_id_fkey";

-- AddForeignKey
ALTER TABLE "film_crew" ADD CONSTRAINT "film_crew_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "people"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "film_crew" ADD CONSTRAINT "film_crew_film_id_fkey" FOREIGN KEY ("film_id") REFERENCES "films"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "film_cast" ADD CONSTRAINT "film_cast_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "people"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "film_cast" ADD CONSTRAINT "film_cast_film_id_fkey" FOREIGN KEY ("film_id") REFERENCES "films"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "films_genres" ADD CONSTRAINT "films_genres_film_id_fkey" FOREIGN KEY ("film_id") REFERENCES "films"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "films_genres" ADD CONSTRAINT "films_genres_genre_id_fkey" FOREIGN KEY ("genre_id") REFERENCES "genres"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "films_countries" ADD CONSTRAINT "films_countries_film_id_fkey" FOREIGN KEY ("film_id") REFERENCES "films"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "films_countries" ADD CONSTRAINT "films_countries_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "countries"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "films_studios" ADD CONSTRAINT "films_studios_film_id_fkey" FOREIGN KEY ("film_id") REFERENCES "films"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "films_studios" ADD CONSTRAINT "films_studios_studio_id_fkey" FOREIGN KEY ("studio_id") REFERENCES "studios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "films_collections" ADD CONSTRAINT "films_collections_film_id_fkey" FOREIGN KEY ("film_id") REFERENCES "films"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "films_collections" ADD CONSTRAINT "films_collections_collection_id_fkey" FOREIGN KEY ("collection_id") REFERENCES "collections"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nominations" ADD CONSTRAINT "nominations_award_id_fkey" FOREIGN KEY ("award_id") REFERENCES "awards"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "film_award_nominations" ADD CONSTRAINT "film_award_nominations_award_id_fkey" FOREIGN KEY ("award_id") REFERENCES "awards"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "film_award_nominations" ADD CONSTRAINT "film_award_nominations_nomination_id_fkey" FOREIGN KEY ("nomination_id") REFERENCES "nominations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "film_award_nominations" ADD CONSTRAINT "film_award_nominations_film_id_fkey" FOREIGN KEY ("film_id") REFERENCES "films"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "film_award_nominations" ADD CONSTRAINT "film_award_nominations_actor_id_fkey" FOREIGN KEY ("actor_id") REFERENCES "people"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "film_trailers" ADD CONSTRAINT "film_trailers_film_id_fkey" FOREIGN KEY ("film_id") REFERENCES "films"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "series_extensions" ADD CONSTRAINT "series_extensions_film_id_fkey" FOREIGN KEY ("film_id") REFERENCES "films"("id") ON DELETE CASCADE ON UPDATE CASCADE;
