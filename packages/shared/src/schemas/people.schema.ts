import z from 'zod';
import { PersonRole } from '~/enums';
import { getArrayFromQuery, getBoolFromQuery } from '~/helpers';

export const CreatePersonSchema = z.object({
  name: z.string(),
  selected: z.boolean().optional(),
});

export const GetPeopleListQuerySchema = z
  .object({
    pageIndex: z.coerce.number(),
    q: z.string().optional().nullable(),
    role: z.enum(PersonRole),
    selected: getBoolFromQuery.optional(),
  })
  .partial();

export const SearchPersonSchema = z
  .object({
    q: z.string(),
    selected: getArrayFromQuery(z.coerce.number()),
  })
  .partial();

export const UpdatePersonInputSchema = CreatePersonSchema.partial();

export const PersonResponseSchema = z.object({
  id: z.coerce.number(),
  name: z.string(),
  selected: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const PeopleListResponseSchema = z.object({
  list: z.array(PersonResponseSchema.pick({ id: true, name: true, selected: true })),
  total: z.coerce.number(),
});

export type GetPeopleListQuery = z.infer<typeof GetPeopleListQuerySchema>;
export type CreatePersonInput = z.infer<typeof CreatePersonSchema>;
export type UpdatePersonInput = z.infer<typeof UpdatePersonInputSchema>;
export type SearchPersonQuery = z.infer<typeof SearchPersonSchema>;
