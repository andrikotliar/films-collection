CREATE TYPE "public"."hobby_item_type" AS ENUM('BOOK', 'BOARD_GAME');--> statement-breakpoint
ALTER TYPE "public"."collection_category" ADD VALUE 'HOBBY_ITEM_CHAPTER';--> statement-breakpoint
CREATE TABLE "hobbies" (
	"id" uuid DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "hobby_items" (
	"id" uuid DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"type" "hobby_item_type" DEFAULT 'BOOK' NOT NULL,
	"description" text NOT NULL,
	"hobby_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "hobby_items_collections" (
	"id" uuid DEFAULT gen_random_uuid() NOT NULL,
	"hobby_id" uuid NOT NULL,
	"collection_id" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "hobby_items" ADD CONSTRAINT "hobby_items_hobby_id_fkey" FOREIGN KEY ("hobby_id") REFERENCES "public"."hobbies"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "hobby_items_collections" ADD CONSTRAINT "hobby_items_collections_hobby_id_fkey" FOREIGN KEY ("hobby_id") REFERENCES "public"."hobbies"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "hobby_items_collections" ADD CONSTRAINT "hobby_items_collections_collection_id_fkey" FOREIGN KEY ("collection_id") REFERENCES "public"."collections"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "hobby_items_collections_hobby_id_collection_id_key" ON "hobby_items_collections" USING btree ("hobby_id" uuid_ops,"collection_id" int4_ops);