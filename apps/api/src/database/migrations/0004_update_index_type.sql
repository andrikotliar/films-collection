DROP INDEX "film_trailers_film_id_url_key";--> statement-breakpoint
CREATE UNIQUE INDEX "film_trailers_film_id_url_key" ON "film_trailers" USING btree ("film_id" int4_ops,"url" text_ops);