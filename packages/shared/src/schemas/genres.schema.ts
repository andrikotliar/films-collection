import { z } from 'zod';
import { getListResponseSchema } from '~/helpers';

export const GenreInputSchema = z.object({
  title: z.string(),
});

export const GenreResponseSchema = z.object({
  id: z.coerce.number(),
  title: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const GenresListResponseSchema = getListResponseSchema(
  z.array(GenreResponseSchema.pick({ id: true, title: true })),
);

export type GenreInput = z.infer<typeof GenreInputSchema>;
