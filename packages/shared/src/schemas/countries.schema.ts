import z from 'zod';
import { getListResponseSchema } from '~/helpers';

export const CountryInputSchema = z.object({
  title: z.string(),
});

export const CountryResponseSchema = z.object({
  id: z.coerce.number(),
  title: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const CountriesListResponseSchema = getListResponseSchema(
  z.array(CountryResponseSchema.pick({ id: true, title: true })),
);

export type CountryInput = z.infer<typeof CountryInputSchema>;
