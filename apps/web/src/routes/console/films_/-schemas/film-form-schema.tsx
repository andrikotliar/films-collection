import { CreateFilmInputSchema } from '@films-collection/shared';
import z from 'zod';
import { FormIdParamSchema } from '~/shared';

export const FilmFormSchema = z
  .object({
    ...CreateFilmInputSchema.shape,
    poster: z.union([z.string().nonempty({ error: 'Poster cannot be empty' }), z.file()]),
    id: FormIdParamSchema,
  })
  .superRefine((data, ctx) => {
    if (data.chapterKey !== null && data.chapterOrder === null) {
      ctx.addIssue({
        path: ['chapterOrder'],
        message: 'Chapter order cannot be null',
        code: 'custom',
      });
    }
  });
