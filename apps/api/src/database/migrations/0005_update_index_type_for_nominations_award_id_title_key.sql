DROP INDEX "nominations_award_id_title_key";--> statement-breakpoint
CREATE UNIQUE INDEX "nominations_award_id_title_key" ON "nominations" USING btree ("award_id" int4_ops,"title" text_ops);