import z from 'zod';
import { PersonRole } from '~/enums';

export const CreatePersonSchema = z.object({
  name: z.string(),
});

export const GetPeopleListQuerySchema = z.object({
  skip: z.number(),
  q: z.string().optional(),
  role: z.enum(PersonRole),
});

export const SearchPersonSchema = z.object({
  q: z.string(),
  selected: z.array(z.number()),
});

export const UpdatePersonInputSchema = CreatePersonSchema.partial();

export type GetPeopleListQuery = z.infer<typeof GetPeopleListQuerySchema>;
export type CreatePersonInput = z.infer<typeof CreatePersonSchema>;
export type UpdatePersonInput = z.infer<typeof UpdatePersonInputSchema>;
export type SearchPersonQuery = z.infer<typeof SearchPersonSchema>;
