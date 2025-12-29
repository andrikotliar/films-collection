import z from 'zod';
import { CollectionEventsListResponseSchema } from '~/schemas/collection-events.schema';
import { buildListOptionSchema } from '~/schemas/list-options.schema';

export const InitialDataResponseSchema = z.object({
  options: z.object({
    collections: buildListOptionSchema(z.number()),
    genres: buildListOptionSchema(z.number()),
    countries: buildListOptionSchema(z.number()),
    studios: buildListOptionSchema(z.number()),
    types: buildListOptionSchema(z.string()),
    styles: buildListOptionSchema(z.string()),
    roles: buildListOptionSchema(z.string()),
    awards: buildListOptionSchema(z.number()),
    collectionCategories: buildListOptionSchema(z.string()),
  }),
  events: CollectionEventsListResponseSchema,
  filmsTotal: z.number(),
});

export type InitialDataResponse = z.infer<typeof InitialDataResponseSchema>;
