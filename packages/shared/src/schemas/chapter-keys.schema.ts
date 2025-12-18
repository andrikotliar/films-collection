import z from 'zod';
import { schemaRef } from '~/helpers';
import type { InferSchema } from '~/types';

export const CreateChapterKeyInputSchemaRef = schemaRef(
  'CreateChapterKeyInputSchemaRef',
  z.object({
    key: z.string(),
  }),
);

export type CreateChapterKeyInput = InferSchema<typeof CreateChapterKeyInputSchemaRef>;
