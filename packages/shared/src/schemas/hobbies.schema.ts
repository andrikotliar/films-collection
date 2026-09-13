import { z } from 'zod';
import { getListResponseSchema } from '../helpers/index.js';
import { PersonResponseSchema } from './people.schema.js';
import { CollectionResponseSchema } from './collections.schema.js';

export const HobbyMutationSchema = z.object({
  title: z.string().min(3).trim(),
});

export const HobbyResponseSchema = z.object({
  id: z.number(),
  title: z.string(),
});

export const HobbiesListResponseSchema = getListResponseSchema(z.array(HobbyResponseSchema));

export const HobbyItemResponseSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  releaseYear: z.number(),
  collections: z.array(CollectionResponseSchema.pick({ id: true, title: true })),
  authors: z.array(PersonResponseSchema.pick({ id: true, name: true })),
});

export const HobbyByIdQueriesSchema = z
  .object({ pageIndex: z.number(), q: z.string(), collectionId: z.number() })
  .partial();

export const HobbyByIdResponseSchema = HobbyResponseSchema.extend({
  items: z.array(HobbyResponseSchema),
});

export const HobbyItemParamsSchema = z.object({
  id: z.coerce.number(),
  itemId: z.coerce.number(),
});

export const HobbyItemInputSchema = z.object({
  title: z.string(),
  description: z.string(),
  releaseYear: z.coerce.number(),
  collections: z
    .array(
      z.object({
        collectionId: z.number(),
        order: z.number().min(0.1, {
          error: 'Order is required for the collection',
        }),
      }),
    )
    .min(1),
  people: z.array(z.number()).min(1),
  imageUrl: z.string().nullable().optional(),
});

export const HobbyItemUpdateInputSchema = HobbyItemInputSchema.partial();

export const HobbyByIdAdminResponseSchema = HobbyResponseSchema.extend({
  items: z.array(HobbyItemInputSchema.extend({ id: z.number() })),
});

export const HobbyItemsByCollectionIdResponseSchema = z.array(
  z.object({
    id: z.number(),
    title: z.string(),
    imageUrl: z.string().nullable(),
    order: z.number().nullable(),
  }),
);

export type HobbiesListResponse = z.infer<typeof HobbiesListResponseSchema>;
export type HobbyItemInput = z.infer<typeof HobbyItemInputSchema>;
export type HobbyItemUpdateInput = z.infer<typeof HobbyItemUpdateInputSchema>;
export type HobbyItemResponse = z.infer<typeof HobbyItemResponseSchema>;
export type HobbyByIdAdminResponse = z.infer<typeof HobbyByIdAdminResponseSchema>;
