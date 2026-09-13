ALTER TABLE "hobbies" ADD COLUMN "created_at" timestamp(3) DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "hobbies" ADD COLUMN "updated_at" timestamp(3) DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "hobby_items" ADD COLUMN "created_at" timestamp(3) DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "hobby_items" ADD COLUMN "updated_at" timestamp(3) DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "hobby_items_collections" ADD COLUMN "created_at" timestamp(3) DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "hobby_items_collections" ADD COLUMN "updated_at" timestamp(3) DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "hobby_items_people" ADD COLUMN "created_at" timestamp(3) DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "hobby_items_people" ADD COLUMN "updated_at" timestamp(3) DEFAULT now() NOT NULL;