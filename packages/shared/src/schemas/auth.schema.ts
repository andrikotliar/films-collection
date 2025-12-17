import z from 'zod';
import { schemaRef } from '~/helpers/schema-ref.helper';

export const LoginSchema = schemaRef(
  'LoginSchema',
  z.object({
    username: z.string(),
    password: z.string(),
  }),
);

export type LoginInput = z.infer<typeof LoginSchema.value>;
