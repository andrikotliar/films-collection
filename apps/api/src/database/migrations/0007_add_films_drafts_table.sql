CREATE TABLE "films_drafts" (
	"id" serial PRIMARY KEY NOT NULL,
	"film_id" text NOT NULL,
	"content" jsonb NOT NULL,
	"created_at" timestamp(3) DEFAULT now() NOT NULL,
	"updated_at" timestamp(3) DEFAULT now() NOT NULL
);
