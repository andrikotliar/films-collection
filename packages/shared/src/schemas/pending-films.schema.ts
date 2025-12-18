import z from 'zod';
import { schemaRef } from '~/helpers';
import type { InferSchema } from '~/types';

export const CreatePendingFilmInputSchemaRef = schemaRef(
  'CreatePendingFilmInputSchemaRef',
  z.object({
    title: z.string(),
    priority: z.number().min(1).max(3),
    collectionId: z.number().min(1).nullable(),
    rating: z.number().min(1).max(3).nullable(),
  }),
);

export const GetPendingFilmsListQuerySchemaRef = schemaRef(
  'GetPendingFilmsListQuerySchemaRef',
  z
    .object({
      q: z.string(),
      skip: z.number(),
      orderKey: z.string(),
      order: z.string(),
      priorities: z.array(z.number().min(1).max(3)),
    })
    .partial(),
);

export const UpdatePendingFilmInputSchemaRef = schemaRef(
  'UpdatePendingFilmInputSchemaRef',
  CreatePendingFilmInputSchemaRef.value.partial(),
);

export type CreatePendingFilmInput = InferSchema<typeof CreatePendingFilmInputSchemaRef>;
export type UpdatePendingFilmInput = InferSchema<typeof UpdatePendingFilmInputSchemaRef>;
export type GetPendingFilmsListQuery = InferSchema<typeof GetPendingFilmsListQuerySchemaRef>;
