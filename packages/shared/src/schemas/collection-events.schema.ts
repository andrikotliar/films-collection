import z from 'zod';
import { schemaRef } from '~/helpers';
import type { InferSchema } from '~/types';

export const CreateCollectionEventInputSchemaRef = schemaRef(
  'CreateCollectionEventInputSchemaRef',
  z.object({
    title: z.string(),
    collectionId: z.number(),
    startDateCode: z.number(),
    endDateCode: z.number(),
    yearFrom: z.number(),
    titleFilmId: z.number(),
  }),
);

export const UpdateCollectionEventInputSchemaRef = schemaRef(
  'UpdateCollectionEventInputSchemaRef',
  CreateCollectionEventInputSchemaRef.value.partial(),
);

export type CreateCollectionEventInput = InferSchema<typeof CreateCollectionEventInputSchemaRef>;
export type UpdateCollectionEventInput = InferSchema<typeof UpdateCollectionEventInputSchemaRef>;
