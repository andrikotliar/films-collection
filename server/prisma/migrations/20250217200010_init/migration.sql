-- CreateEnum
CREATE TYPE "title_type" AS ENUM ('FILM', 'SERIES');

-- CreateEnum
CREATE TYPE "title_style" AS ENUM ('LIVE_ACTION', 'ANIMATION');

-- CreateEnum
CREATE TYPE "collection_category" AS ENUM ('GENERAL', 'CINEMATIC_UNIVERSE', 'TOP');

-- CreateEnum
CREATE TYPE "crew_position" AS ENUM ('DIRECTOR', 'WRITER', 'PRODUCER', 'COMPOSER', 'CAMERAMAN', 'CREATOR');

-- CreateTable
CREATE TABLE "films" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "type" "title_type" NOT NULL DEFAULT 'FILM',
    "style" "title_style" NOT NULL DEFAULT 'LIVE_ACTION',
    "release_date" DATE NOT NULL,
    "duration" INTEGER NOT NULL DEFAULT 0,
    "description" TEXT NOT NULL,
    "poster" TEXT,
    "youtube_trailer_id" TEXT,
    "budget" BIGINT NOT NULL DEFAULT 0,
    "box_office" BIGINT NOT NULL DEFAULT 0,
    "rating" INTEGER NOT NULL DEFAULT 1,
    "chapter_key" TEXT,
    "chapter_order" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "draft" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "films_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "people" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT,

    CONSTRAINT "people_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "film_crew" (
    "id" SERIAL NOT NULL,
    "person_id" INTEGER NOT NULL,
    "film_id" INTEGER NOT NULL,
    "position" "crew_position" NOT NULL,
    "comment" TEXT,

    CONSTRAINT "film_crew_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "film_cast" (
    "id" SERIAL NOT NULL,
    "person_id" INTEGER NOT NULL,
    "film_id" INTEGER NOT NULL,
    "character_name" TEXT NOT NULL,
    "character_image" TEXT,

    CONSTRAINT "film_cast_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "genres" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "genres_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "films_genres" (
    "id" SERIAL NOT NULL,
    "film_id" INTEGER NOT NULL,
    "genre_id" INTEGER NOT NULL,

    CONSTRAINT "films_genres_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "countries" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "countries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "films_countries" (
    "id" SERIAL NOT NULL,
    "film_id" INTEGER NOT NULL,
    "country_id" INTEGER NOT NULL,

    CONSTRAINT "films_countries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "studios" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "studios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "films_studios" (
    "id" SERIAL NOT NULL,
    "film_id" INTEGER NOT NULL,
    "studio_id" INTEGER NOT NULL,

    CONSTRAINT "films_studios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "collections" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "category" "collection_category" NOT NULL DEFAULT 'GENERAL',

    CONSTRAINT "collections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "films_collections" (
    "id" SERIAL NOT NULL,
    "film_id" INTEGER NOT NULL,
    "collection_id" INTEGER NOT NULL,
    "order" INTEGER,

    CONSTRAINT "films_collections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "awards" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "image" TEXT NOT NULL,

    CONSTRAINT "awards_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nominations" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "award_id" INTEGER NOT NULL,

    CONSTRAINT "nominations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "film_award_nominations" (
    "id" SERIAL NOT NULL,
    "award_id" INTEGER NOT NULL,
    "nomination_id" INTEGER NOT NULL,
    "film_id" INTEGER NOT NULL,
    "comment" TEXT,
    "actor_id" INTEGER,

    CONSTRAINT "film_award_nominations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "series_extensions" (
    "id" SERIAL NOT NULL,
    "episodes_total" INTEGER NOT NULL DEFAULT 1,
    "seasons_total" INTEGER NOT NULL DEFAULT 1,
    "film_id" INTEGER NOT NULL,

    CONSTRAINT "series_extensions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "series_seasons" (
    "id" SERIAL NOT NULL,
    "number" INTEGER NOT NULL,
    "title" TEXT,
    "description" TEXT NOT NULL,
    "episodes_count" INTEGER NOT NULL DEFAULT 1,
    "release_date" DATE NOT NULL,
    "youtube_trailer_id" TEXT,
    "series_extension_id" INTEGER NOT NULL,

    CONSTRAINT "series_seasons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "refresh_token" TEXT,
    "verified" BOOLEAN DEFAULT false,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pending_films" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "priority" INTEGER NOT NULL DEFAULT 1,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pending_films_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "films_title_idx" ON "films"("title");

-- CreateIndex
CREATE UNIQUE INDEX "genres_title_key" ON "genres"("title");

-- CreateIndex
CREATE UNIQUE INDEX "films_genres_film_id_genre_id_key" ON "films_genres"("film_id", "genre_id");

-- CreateIndex
CREATE UNIQUE INDEX "countries_title_key" ON "countries"("title");

-- CreateIndex
CREATE UNIQUE INDEX "films_countries_film_id_country_id_key" ON "films_countries"("film_id", "country_id");

-- CreateIndex
CREATE UNIQUE INDEX "studios_title_key" ON "studios"("title");

-- CreateIndex
CREATE UNIQUE INDEX "films_studios_film_id_studio_id_key" ON "films_studios"("film_id", "studio_id");

-- CreateIndex
CREATE UNIQUE INDEX "collections_title_key" ON "collections"("title");

-- CreateIndex
CREATE UNIQUE INDEX "films_collections_film_id_collection_id_key" ON "films_collections"("film_id", "collection_id");

-- CreateIndex
CREATE UNIQUE INDEX "awards_title_key" ON "awards"("title");

-- CreateIndex
CREATE UNIQUE INDEX "film_award_nominations_award_id_film_id_nomination_id_key" ON "film_award_nominations"("award_id", "film_id", "nomination_id");

-- CreateIndex
CREATE UNIQUE INDEX "series_extensions_film_id_key" ON "series_extensions"("film_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- AddForeignKey
ALTER TABLE "film_crew" ADD CONSTRAINT "film_crew_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "people"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "film_crew" ADD CONSTRAINT "film_crew_film_id_fkey" FOREIGN KEY ("film_id") REFERENCES "films"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "film_cast" ADD CONSTRAINT "film_cast_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "people"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "film_cast" ADD CONSTRAINT "film_cast_film_id_fkey" FOREIGN KEY ("film_id") REFERENCES "films"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "films_genres" ADD CONSTRAINT "films_genres_film_id_fkey" FOREIGN KEY ("film_id") REFERENCES "films"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "films_genres" ADD CONSTRAINT "films_genres_genre_id_fkey" FOREIGN KEY ("genre_id") REFERENCES "genres"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "films_countries" ADD CONSTRAINT "films_countries_film_id_fkey" FOREIGN KEY ("film_id") REFERENCES "films"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "films_countries" ADD CONSTRAINT "films_countries_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "countries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "films_studios" ADD CONSTRAINT "films_studios_film_id_fkey" FOREIGN KEY ("film_id") REFERENCES "films"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "films_studios" ADD CONSTRAINT "films_studios_studio_id_fkey" FOREIGN KEY ("studio_id") REFERENCES "studios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "films_collections" ADD CONSTRAINT "films_collections_film_id_fkey" FOREIGN KEY ("film_id") REFERENCES "films"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "films_collections" ADD CONSTRAINT "films_collections_collection_id_fkey" FOREIGN KEY ("collection_id") REFERENCES "collections"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nominations" ADD CONSTRAINT "nominations_award_id_fkey" FOREIGN KEY ("award_id") REFERENCES "awards"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "film_award_nominations" ADD CONSTRAINT "film_award_nominations_award_id_fkey" FOREIGN KEY ("award_id") REFERENCES "awards"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "film_award_nominations" ADD CONSTRAINT "film_award_nominations_nomination_id_fkey" FOREIGN KEY ("nomination_id") REFERENCES "nominations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "film_award_nominations" ADD CONSTRAINT "film_award_nominations_film_id_fkey" FOREIGN KEY ("film_id") REFERENCES "films"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "film_award_nominations" ADD CONSTRAINT "film_award_nominations_actor_id_fkey" FOREIGN KEY ("actor_id") REFERENCES "people"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "series_extensions" ADD CONSTRAINT "series_extensions_film_id_fkey" FOREIGN KEY ("film_id") REFERENCES "films"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "series_seasons" ADD CONSTRAINT "series_seasons_series_extension_id_fkey" FOREIGN KEY ("series_extension_id") REFERENCES "series_extensions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
