import z from 'zod';
import { schemaRef } from '~/helpers';
import type { InferSchema } from '~/types';

export const StudioInputSchemaRef = schemaRef(
  'StudioInputSchemaRef',
  z.object({
    title: z.string(),
  }),
);

export type StudioInput = InferSchema<typeof StudioInputSchemaRef>;
