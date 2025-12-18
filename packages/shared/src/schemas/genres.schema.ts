import z from 'zod';
import { schemaRef } from '~/helpers';
import type { InferSchema } from '~/types';

export const GenreInputSchemaRef = schemaRef(
  'GenreInputSchemaRef',
  z.object({
    title: z.string(),
  }),
);

export type GenreInput = InferSchema<typeof GenreInputSchemaRef>;
