import z from 'zod';
import { CollectionCategory } from '~/enums';

export const CreateCollectionInputSchema = z.object({
  title: z.string(),
  category: z.enum(CollectionCategory),
});

export const UpdateCollectionInputSchema = CreateCollectionInputSchema.partial();

export type CreateCollectionInput = z.infer<typeof CreateCollectionInputSchema>;
export type UpdateCollectionInput = z.infer<typeof UpdateCollectionInputSchema>;
