-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TYPE "public"."collection_category" AS ENUM('GENERAL', 'CINEMATIC_UNIVERSE', 'TOP');--> statement-breakpoint
CREATE TYPE "public"."person_role" AS ENUM('DIRECTOR', 'WRITER', 'PRODUCER', 'COMPOSER', 'CAMERAMAN', 'CREATOR', 'ACTOR');--> statement-breakpoint
CREATE TYPE "public"."title_style" AS ENUM('LIVE_ACTION', 'ANIMATION');--> statement-breakpoint
CREATE TYPE "public"."title_type" AS ENUM('FILM', 'SERIES');--> statement-breakpoint
CREATE TABLE "films" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"type" "title_type" DEFAULT 'FILM' NOT NULL,
	"style" "title_style" DEFAULT 'LIVE_ACTION' NOT NULL,
	"release_date" date NOT NULL,
	"duration" integer DEFAULT 0 NOT NULL,
	"poster" text,
	"budget" bigint DEFAULT 0 NOT NULL,
	"box_office" bigint DEFAULT 0 NOT NULL,
	"rating" integer DEFAULT 1 NOT NULL,
	"chapter_key" text,
	"chapter_order" integer,
	"created_at" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(3) NOT NULL,
	"draft" boolean DEFAULT false NOT NULL,
	"deletedAt" timestamp(3),
	"overview" text
);
--> statement-breakpoint
CREATE TABLE "awards" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"created_at" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(3) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "collections" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"category" "collection_category" DEFAULT 'GENERAL' NOT NULL,
	"created_at" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(3) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "collection_events" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"collection_id" integer NOT NULL,
	"created_at" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(3) NOT NULL,
	"year_from" integer DEFAULT 0 NOT NULL,
	"title_film_id" integer NOT NULL,
	"start_date_code" integer NOT NULL,
	"end_date_code" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "films_collections" (
	"id" serial PRIMARY KEY NOT NULL,
	"film_id" integer NOT NULL,
	"collection_id" integer NOT NULL,
	"order" integer,
	"created_at" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(3) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "pending_films" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"priority" integer DEFAULT 1 NOT NULL,
	"created_at" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(3) NOT NULL,
	"collectionId" integer,
	"rating" integer
);
--> statement-breakpoint
CREATE TABLE "film_trailers" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer NOT NULL,
	"film_id" integer NOT NULL,
	"created_at" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(3) NOT NULL,
	"url" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "countries" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"created_at" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(3) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "film_award_nominations" (
	"id" serial PRIMARY KEY NOT NULL,
	"award_id" integer NOT NULL,
	"nomination_id" integer NOT NULL,
	"film_id" integer NOT NULL,
	"comment" text,
	"actor_id" integer,
	"created_at" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(3) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "film_chapter_keys" (
	"key" text PRIMARY KEY NOT NULL,
	"created_at" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(3) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "films_countries" (
	"id" serial PRIMARY KEY NOT NULL,
	"film_id" integer NOT NULL,
	"country_id" integer NOT NULL,
	"created_at" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(3) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "films_genres" (
	"id" serial PRIMARY KEY NOT NULL,
	"film_id" integer NOT NULL,
	"genre_id" integer NOT NULL,
	"created_at" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(3) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "films_studios" (
	"id" serial PRIMARY KEY NOT NULL,
	"film_id" integer NOT NULL,
	"studio_id" integer NOT NULL,
	"created_at" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(3) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "genres" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"created_at" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(3) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "nominations" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"award_id" integer NOT NULL,
	"should_include_actor" boolean DEFAULT false NOT NULL,
	"created_at" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(3) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "series_extensions" (
	"id" serial PRIMARY KEY NOT NULL,
	"episodes_total" integer DEFAULT 1 NOT NULL,
	"seasons_total" integer DEFAULT 1 NOT NULL,
	"film_id" integer NOT NULL,
	"finished_at" date,
	"created_at" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(3) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "studios" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"created_at" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(3) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" text NOT NULL,
	"password" text NOT NULL,
	"refresh_token" text,
	"created_at" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(3) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "films_people" (
	"id" serial PRIMARY KEY NOT NULL,
	"person_id" integer NOT NULL,
	"film_id" integer NOT NULL,
	"role" "person_role" NOT NULL,
	"details" text,
	"comment" text,
	"created_at" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(3) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "people" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"created_at" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(3) NOT NULL,
	"selected" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE "page_content" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"content" text NOT NULL,
	"created_at" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"page_key" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "films" ADD CONSTRAINT "films_chapter_key_fkey" FOREIGN KEY ("chapter_key") REFERENCES "public"."film_chapter_keys"("key") ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "collection_events" ADD CONSTRAINT "collection_events_title_film_id_fkey" FOREIGN KEY ("title_film_id") REFERENCES "public"."films"("id") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "collection_events" ADD CONSTRAINT "collection_events_collection_id_fkey" FOREIGN KEY ("collection_id") REFERENCES "public"."collections"("id") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "films_collections" ADD CONSTRAINT "films_collections_film_id_fkey" FOREIGN KEY ("film_id") REFERENCES "public"."films"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "films_collections" ADD CONSTRAINT "films_collections_collection_id_fkey" FOREIGN KEY ("collection_id") REFERENCES "public"."collections"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "pending_films" ADD CONSTRAINT "pending_films_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "public"."collections"("id") ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "film_trailers" ADD CONSTRAINT "film_trailers_film_id_fkey" FOREIGN KEY ("film_id") REFERENCES "public"."films"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "film_award_nominations" ADD CONSTRAINT "film_award_nominations_award_id_fkey" FOREIGN KEY ("award_id") REFERENCES "public"."awards"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "film_award_nominations" ADD CONSTRAINT "film_award_nominations_nomination_id_fkey" FOREIGN KEY ("nomination_id") REFERENCES "public"."nominations"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "film_award_nominations" ADD CONSTRAINT "film_award_nominations_film_id_fkey" FOREIGN KEY ("film_id") REFERENCES "public"."films"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "film_award_nominations" ADD CONSTRAINT "film_award_nominations_actor_id_fkey" FOREIGN KEY ("actor_id") REFERENCES "public"."people"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "films_countries" ADD CONSTRAINT "films_countries_film_id_fkey" FOREIGN KEY ("film_id") REFERENCES "public"."films"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "films_countries" ADD CONSTRAINT "films_countries_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "public"."countries"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "films_genres" ADD CONSTRAINT "films_genres_film_id_fkey" FOREIGN KEY ("film_id") REFERENCES "public"."films"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "films_genres" ADD CONSTRAINT "films_genres_genre_id_fkey" FOREIGN KEY ("genre_id") REFERENCES "public"."genres"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "films_studios" ADD CONSTRAINT "films_studios_film_id_fkey" FOREIGN KEY ("film_id") REFERENCES "public"."films"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "films_studios" ADD CONSTRAINT "films_studios_studio_id_fkey" FOREIGN KEY ("studio_id") REFERENCES "public"."studios"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "nominations" ADD CONSTRAINT "nominations_award_id_fkey" FOREIGN KEY ("award_id") REFERENCES "public"."awards"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "series_extensions" ADD CONSTRAINT "series_extensions_film_id_fkey" FOREIGN KEY ("film_id") REFERENCES "public"."films"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "films_people" ADD CONSTRAINT "films_people_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "public"."people"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "films_people" ADD CONSTRAINT "films_people_film_id_fkey" FOREIGN KEY ("film_id") REFERENCES "public"."films"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
CREATE INDEX "films_title_idx" ON "films" USING btree ("title" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "awards_title_key" ON "awards" USING btree ("title" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "collections_title_key" ON "collections" USING btree ("title" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "films_collections_film_id_collection_id_key" ON "films_collections" USING btree ("film_id" int4_ops,"collection_id" int4_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "film_trailers_film_id_url_key" ON "film_trailers" USING btree ("film_id" int4_ops,"url" int4_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "countries_title_key" ON "countries" USING btree ("title" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "film_award_nominations_award_id_film_id_nomination_id_key" ON "film_award_nominations" USING btree ("award_id" int4_ops,"film_id" int4_ops,"nomination_id" int4_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "films_countries_film_id_country_id_key" ON "films_countries" USING btree ("film_id" int4_ops,"country_id" int4_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "films_genres_film_id_genre_id_key" ON "films_genres" USING btree ("film_id" int4_ops,"genre_id" int4_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "films_studios_film_id_studio_id_key" ON "films_studios" USING btree ("film_id" int4_ops,"studio_id" int4_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "genres_title_key" ON "genres" USING btree ("title" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "nominations_award_id_title_key" ON "nominations" USING btree ("award_id" int4_ops,"title" int4_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "series_extensions_film_id_key" ON "series_extensions" USING btree ("film_id" int4_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "studios_title_key" ON "studios" USING btree ("title" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "users_username_key" ON "users" USING btree ("username" text_ops);
*/