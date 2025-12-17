import z from 'zod';

export const CountryInputSchema = z.object({
  title: z.string(),
});

export type CountryInput = z.infer<typeof CountryInputSchema>;
