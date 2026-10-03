CREATE TABLE "board_games" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"main_game_id" integer,
	"games_played" integer DEFAULT 0,
	"released_year" integer NOT NULL,
	"rating" integer DEFAULT 1 NOT NULL,
	"created_at" timestamp(3) DEFAULT now() NOT NULL,
	"updated_at" timestamp(3) DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "board_games_creators" (
	"id" serial PRIMARY KEY NOT NULL,
	"board_game_id" integer NOT NULL,
	"creator_id" integer NOT NULL,
	"created_at" timestamp(3) DEFAULT now() NOT NULL,
	"updated_at" timestamp(3) DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "books" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"publication_year" integer NOT NULL,
	"pages_number" integer NOT NULL,
	"rating" integer DEFAULT 1 NOT NULL,
	"created_at" timestamp(3) DEFAULT now() NOT NULL,
	"updated_at" timestamp(3) DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "books_authors" (
	"id" serial PRIMARY KEY NOT NULL,
	"book_id" integer NOT NULL,
	"author_id" integer NOT NULL,
	"created_at" timestamp(3) DEFAULT now() NOT NULL,
	"updated_at" timestamp(3) DEFAULT now() NOT NULL,
	CONSTRAINT "book_author_unique" UNIQUE("book_id","author_id")
);
--> statement-breakpoint
CREATE TABLE "books_collections" (
	"id" serial PRIMARY KEY NOT NULL,
	"book_id" integer NOT NULL,
	"collection_id" integer NOT NULL,
	"created_at" timestamp(3) DEFAULT now() NOT NULL,
	"updated_at" timestamp(3) DEFAULT now() NOT NULL,
	CONSTRAINT "book_collections_unique" UNIQUE("book_id","collection_id")
);
--> statement-breakpoint
CREATE TABLE "books_genres" (
	"id" serial PRIMARY KEY NOT NULL,
	"book_id" integer NOT NULL,
	"genre_id" integer NOT NULL,
	"created_at" timestamp(3) DEFAULT now() NOT NULL,
	"updated_at" timestamp(3) DEFAULT now() NOT NULL,
	CONSTRAINT "book_genres_unique" UNIQUE("book_id","genre_id")
);
--> statement-breakpoint
DROP TABLE "hobbies" CASCADE;--> statement-breakpoint
DROP TABLE "hobby_items" CASCADE;--> statement-breakpoint
DROP TABLE "hobby_items_collections" CASCADE;--> statement-breakpoint
DROP TABLE "hobby_items_people" CASCADE;--> statement-breakpoint
ALTER TABLE "films" RENAME COLUMN "synopsis" TO "description";--> statement-breakpoint
ALTER TABLE "board_games_creators" ADD CONSTRAINT "board_games_creators_board_game_id_board_games_id_fk" FOREIGN KEY ("board_game_id") REFERENCES "public"."board_games"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "board_games_creators" ADD CONSTRAINT "board_games_creators_creator_id_people_id_fk" FOREIGN KEY ("creator_id") REFERENCES "public"."people"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "board_games_creators" ADD CONSTRAINT "board_games_creators_board_game_id_fkey" FOREIGN KEY ("board_game_id") REFERENCES "public"."board_games"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "board_games_creators" ADD CONSTRAINT "board_games_creators_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "public"."people"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "books_authors" ADD CONSTRAINT "books_authors_book_id_books_id_fk" FOREIGN KEY ("book_id") REFERENCES "public"."books"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "books_authors" ADD CONSTRAINT "books_authors_author_id_people_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."people"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "books_authors" ADD CONSTRAINT "book_authors_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "public"."books"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "books_authors" ADD CONSTRAINT "book_authors_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "public"."people"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "books_collections" ADD CONSTRAINT "books_collections_book_id_books_id_fk" FOREIGN KEY ("book_id") REFERENCES "public"."books"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "books_collections" ADD CONSTRAINT "books_collections_collection_id_collections_id_fk" FOREIGN KEY ("collection_id") REFERENCES "public"."collections"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "books_collections" ADD CONSTRAINT "book_collections_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "public"."books"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "books_collections" ADD CONSTRAINT "book_collections_collection_id_fkey" FOREIGN KEY ("collection_id") REFERENCES "public"."collections"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "books_genres" ADD CONSTRAINT "books_genres_book_id_books_id_fk" FOREIGN KEY ("book_id") REFERENCES "public"."books"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "books_genres" ADD CONSTRAINT "books_genres_genre_id_genres_id_fk" FOREIGN KEY ("genre_id") REFERENCES "public"."genres"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "books_genres" ADD CONSTRAINT "book_genres_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "public"."books"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "books_genres" ADD CONSTRAINT "book_genres_genre_id_fkey" FOREIGN KEY ("genre_id") REFERENCES "public"."genres"("id") ON DELETE cascade ON UPDATE no action;