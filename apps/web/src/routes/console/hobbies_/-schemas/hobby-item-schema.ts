import { HobbyItemInputSchema } from '@hobbies-collection/shared';
import z from 'zod';
import { FormIdParamSchema } from '~/shared';

export const HobbyItemFormSchema = HobbyItemInputSchema.extend({
  id: FormIdParamSchema,
  imageUrl: z.union([z.string(), z.file()]).nullable().optional(),
});
