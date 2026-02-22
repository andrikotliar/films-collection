import z from 'zod';
import { CollectionCurrentEventsListResponseSchema } from '~/schemas/collection-events.schema';
import { buildListOptionSchema } from '~/schemas/list-options.schema';

export const InitialDataResponseSchema = z.object({
  options: z.object({
    collections: buildListOptionSchema(z.coerce.number()),
    genres: buildListOptionSchema(z.coerce.number()),
    countries: buildListOptionSchema(z.coerce.number()),
    studios: buildListOptionSchema(z.coerce.number()),
    types: buildListOptionSchema(z.string()),
    styles: buildListOptionSchema(z.string()),
    roles: buildListOptionSchema(z.string()),
    awards: buildListOptionSchema(z.coerce.number()),
    collectionCategories: buildListOptionSchema(z.string()),
    selectedPeople: buildListOptionSchema(z.coerce.number()),
  }),
  events: CollectionCurrentEventsListResponseSchema,
  filmsTotal: z.coerce.number(),
});

export type InitialDataResponse = z.infer<typeof InitialDataResponseSchema>;
