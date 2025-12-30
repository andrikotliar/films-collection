import z from 'zod';

export const CountryInputSchema = z.object({
  title: z.string(),
});

export const CountryResponseSchema = z.object({
  id: z.coerce.number(),
  title: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const CountriesListResponseSchema = z.array(
  CountryResponseSchema.pick({ id: true, title: true }),
);

export type CountryInput = z.infer<typeof CountryInputSchema>;
