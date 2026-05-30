import { z } from 'zod';
import { CollectionCategory } from '~/enums/collection-category.enum.js';
import { getListResponseSchema } from '~/helpers/index.js';
import { CommonListQuerySchema } from '~/schemas/common.schema.js';

export const CreateCollectionInputSchema = z.object({
  title: z.string(),
  category: z.enum(CollectionCategory),
  description: z.string().optional(),
  films: z.array(
    z.object({
      filmId: z.number(),
      order: z.number().min(0.1, 'Order is required'),
      title: z.string(),
    }),
  ),
});

export const UpdateCollectionInputSchema = CreateCollectionInputSchema.partial();

export const CollectionResponseSchema = z.object({
  id: z.coerce.number(),
  title: z.string(),
  description: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
  category: z.enum(CollectionCategory),
});

export const CollectionsListResponseSchema = getListResponseSchema(
  z.array(
    CollectionResponseSchema.pick({
      id: true,
      title: true,
      category: true,
    }),
  ),
);

export const CollectionListQuerySchema = CommonListQuerySchema.extend({
  categories: z.array(z.enum(CollectionCategory)).optional(),
});

export type CreateCollectionInput = z.infer<typeof CreateCollectionInputSchema>;
export type UpdateCollectionInput = z.infer<typeof UpdateCollectionInputSchema>;
export type CollectionListQueryParams = z.infer<typeof CollectionListQuerySchema>;
