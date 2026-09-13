ALTER TYPE "public"."title_type" ADD VALUE 'ANIMATION';--> statement-breakpoint
ALTER TYPE "public"."title_type" ADD VALUE 'ANIMATED_SERIES';--> statement-breakpoint

COMMIT;

UPDATE films SET type = 'ANIMATION' WHERE type = 'FILM' and STYLE = 'ANIMATION';
UPDATE films SET type = 'ANIMATED_SERIES' WHERE type = 'SERIES' and STYLE = 'ANIMATION';

ALTER TABLE "films" DROP COLUMN "style";--> statement-breakpoint
DROP TYPE "public"."title_style";