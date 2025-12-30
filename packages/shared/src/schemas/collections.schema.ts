import z from 'zod';
import { CollectionCategory } from '~/enums';

export const CreateCollectionInputSchema = z.object({
  title: z.string(),
  category: z.enum(CollectionCategory),
});

export const UpdateCollectionInputSchema = CreateCollectionInputSchema.partial();

export const CollectionResponseSchema = z.object({
  id: z.coerce.number(),
  title: z.string(),
  description: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
  category: z.enum(CollectionCategory),
});

export const CollectionsListResponseSchema = z.array(
  CollectionResponseSchema.pick({
    id: true,
    title: true,
    category: true,
  }),
);

export type CreateCollectionInput = z.infer<typeof CreateCollectionInputSchema>;
export type UpdateCollectionInput = z.infer<typeof UpdateCollectionInputSchema>;
