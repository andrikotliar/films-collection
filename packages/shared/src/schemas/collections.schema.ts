import z from 'zod';
import { CollectionCategory } from '~/enums';
import { schemaRef } from '~/helpers';
import type { InferSchema } from '~/types';

export const CreateCollectionInputSchemaRef = schemaRef(
  'CreateCollectionInputSchemaRef',
  z.object({
    title: z.string(),
    category: z.enum(CollectionCategory),
  }),
);

export const UpdateCollectionInputSchemaRef = schemaRef(
  'UpdateCollectionInputSchemaRef',
  CreateCollectionInputSchemaRef.value.partial(),
);

export type CreateCollectionInput = InferSchema<typeof CreateCollectionInputSchemaRef>;
export type UpdateCollectionInput = InferSchema<typeof UpdateCollectionInputSchemaRef>;
