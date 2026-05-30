import { CreateFilmInputSchema } from '@films-collection/shared';
import { z } from 'zod';
import { FormIdParamSchema } from '~/shared';

export const FilmFormSchema = z.object({
  ...CreateFilmInputSchema.shape,
  poster: z.union([z.string(), z.file()]).nullable().optional(),
  id: FormIdParamSchema,
});
