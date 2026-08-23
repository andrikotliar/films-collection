CREATE TABLE "hobby_items_people" (
	"id" uuid DEFAULT gen_random_uuid() NOT NULL,
	"hobby_item_id" uuid NOT NULL,
	"person_id" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "hobby_items_collections" RENAME COLUMN "hobby_id" TO "hobby_item_id";--> statement-breakpoint
ALTER TABLE "hobby_items_collections" DROP CONSTRAINT "hobby_items_collections_hobby_id_fkey";
--> statement-breakpoint
DROP INDEX "hobby_items_collections_hobby_id_collection_id_key";--> statement-breakpoint
ALTER TABLE "hobby_items" ADD COLUMN "release_year" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "hobby_items_people" ADD CONSTRAINT "hobby_items_people_hobby_item_id_fkey" FOREIGN KEY ("hobby_item_id") REFERENCES "public"."hobby_items"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "hobby_items_people" ADD CONSTRAINT "hobby_items_people_collection_id_fkey" FOREIGN KEY ("person_id") REFERENCES "public"."people"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "hobby_items_people_hobby_item_id_collection_id_key" ON "hobby_items_people" USING btree ("hobby_item_id" uuid_ops,"person_id" int4_ops);--> statement-breakpoint
ALTER TABLE "hobby_items_collections" ADD CONSTRAINT "hobby_items_collections_hobby_item_id_fkey" FOREIGN KEY ("hobby_item_id") REFERENCES "public"."hobby_items"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "hobby_items_collections_hobby_item_id_collection_id_key" ON "hobby_items_collections" USING btree ("hobby_item_id" uuid_ops,"collection_id" int4_ops);