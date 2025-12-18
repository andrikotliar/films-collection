import z from 'zod';
import { schemaRef } from '~/helpers/schema-ref.helper';
import type { InferSchema } from '~/types';

export const LoginSchemaRef = schemaRef(
  'LoginSchemaRef',
  z.object({
    username: z.string(),
    password: z.string(),
  }),
);

export type LoginInput = InferSchema<typeof LoginSchemaRef>;
