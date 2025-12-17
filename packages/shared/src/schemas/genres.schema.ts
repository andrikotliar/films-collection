import z from 'zod';

export const GenreInputSchema = z.object({
  title: z.string(),
});

export type GenreInput = z.infer<typeof GenreInputSchema>;
