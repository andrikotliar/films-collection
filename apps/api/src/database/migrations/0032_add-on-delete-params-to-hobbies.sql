ALTER TABLE "hobby_items_collections" DROP CONSTRAINT "hobby_items_collections_hobby_item_id_fkey";
--> statement-breakpoint
ALTER TABLE "hobby_items_collections" DROP CONSTRAINT "hobby_items_collections_collection_id_fkey";
--> statement-breakpoint
ALTER TABLE "hobby_items_people" DROP CONSTRAINT "hobby_items_people_hobby_item_id_fkey";
--> statement-breakpoint
ALTER TABLE "hobby_items_people" DROP CONSTRAINT "hobby_items_people_collection_id_fkey";
--> statement-breakpoint
ALTER TABLE "hobby_items_collections" ADD CONSTRAINT "hobby_items_collections_hobby_item_id_fkey" FOREIGN KEY ("hobby_item_id") REFERENCES "public"."hobby_items"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "hobby_items_collections" ADD CONSTRAINT "hobby_items_collections_collection_id_fkey" FOREIGN KEY ("collection_id") REFERENCES "public"."collections"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "hobby_items_people" ADD CONSTRAINT "hobby_items_people_hobby_item_id_fkey" FOREIGN KEY ("hobby_item_id") REFERENCES "public"."hobby_items"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "hobby_items_people" ADD CONSTRAINT "hobby_items_people_collection_id_fkey" FOREIGN KEY ("person_id") REFERENCES "public"."people"("id") ON DELETE cascade ON UPDATE no action;