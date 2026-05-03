ALTER TABLE "films" ADD COLUMN "synopsis" text;--> statement-breakpoint
ALTER TABLE "films" ADD COLUMN "draft" boolean DEFAULT false;