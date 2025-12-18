import type z from 'zod';
import type { SchemaRef } from '~/helpers';

export type InferSchema<T extends SchemaRef<string, z.ZodType>> = z.infer<T['value']>;
