import z from 'zod';

export const GenreInputSchema = z.object({
  title: z.string(),
});

export const GenreResponseSchema = z.object({
  id: z.number(),
  title: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const GenresListResponseSchema = z.array(
  GenreResponseSchema.pick({ id: true, title: true }),
);

export type GenreInput = z.infer<typeof GenreInputSchema>;
