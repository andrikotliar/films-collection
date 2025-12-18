import z from 'zod';
import { PersonRole } from '~/enums';
import { schemaRef } from '~/helpers';
import type { InferSchema } from '~/types';

export const CreatePersonSchemaRef = schemaRef(
  'CreatePersonSchemaRef',
  z.object({
    name: z.string(),
  }),
);

export const GetPeopleListQuerySchemaRef = schemaRef(
  'GetPeopleListQuerySchemaRef',
  z.object({
    skip: z.number(),
    q: z.string().optional(),
    role: z.enum(PersonRole),
  }),
);

export const SearchPersonSchemaRef = schemaRef(
  'SearchPersonSchemaRef',
  z.object({
    q: z.string(),
    selected: z.array(z.number()),
  }),
);

export const UpdatePersonInputSchemaRef = schemaRef(
  'UpdatePersonInputSchemaRef',
  CreatePersonSchemaRef.value.partial(),
);

export type GetPeopleListQuery = InferSchema<typeof GetPeopleListQuerySchemaRef>;
export type CreatePersonInput = InferSchema<typeof CreatePersonSchemaRef>;
export type UpdatePersonInput = InferSchema<typeof UpdatePersonInputSchemaRef>;
export type SearchPersonQuery = InferSchema<typeof SearchPersonSchemaRef>;
