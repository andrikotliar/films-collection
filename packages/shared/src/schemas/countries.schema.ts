import z from 'zod';
import { schemaRef } from '~/helpers';
import type { InferSchema } from '~/types';

export const CountryInputSchemaRef = schemaRef(
  'CountryInputSchemaRef',
  z.object({
    title: z.string(),
  }),
);

export type CountryInput = InferSchema<typeof CountryInputSchemaRef>;
