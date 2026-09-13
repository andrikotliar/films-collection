import { HobbyMutationSchema } from '@films-collection/shared';
import z from 'zod';
import { FormIdParamSchema } from '~/shared';

export const HobbyFormSchema = HobbyMutationSchema.extend({
  id: FormIdParamSchema,
  imageUrl: z.union([z.file(), z.string()]).optional().nullable(),
});
