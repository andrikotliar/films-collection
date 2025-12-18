import z from 'zod';
import { PersonRole, TitleStyle, TitleType } from '~/enums';
import { schemaRef } from '~/helpers';
import type { InferSchema } from '~/types';

export const GetFilmsListQuerySchemaRef = schemaRef(
  'GetFilmsListQuerySchemaRef',
  z.object({
    limit: z.number(),
    skip: z.number(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    collectionId: z.number().optional(),
    duration: z.number().optional(),
    rating: z.number().optional(),
    seasonsTotal: z.number().optional(),
    episodesTotal: z.number().optional(),
    personId: z.number().optional(),
    awardId: z.number().optional(),
    budget: z.number().optional(),
    boxOffice: z.number().optional(),
    type: z.enum(TitleType).optional(),
    style: z.enum(TitleStyle).optional(),
    personRole: z.enum(PersonRole).optional(),
    genreIds: z.array(z.number()).optional(),
    studioIds: z.array(z.number()).optional(),
    countryIds: z.array(z.number()).optional(),
  }),
);

export const SearchFilmsQuerySchemaRef = schemaRef(
  'SearchFilmsQuerySchemaRef',
  z.object({
    q: z.string(),
  }),
);

export const GetFilmOptionsQuerySchemaRef = schemaRef(
  'GetFilmOptionsQuerySchemaRef',
  z.object({
    q: z.string().optional(),
    selected: z.array(z.number()).optional(),
  }),
);

export const GetFilmRelatedChaptersSchemaRef = schemaRef(
  'GetFilmRelatedChaptersSchemaRef',
  z.object({
    key: z.string(),
    filmId: z.number().optional(),
  }),
);

export const GetAdminListQuerySchemaRef = schemaRef(
  'GetAdminListQuerySchemaRef',
  z.object({
    q: z.string().optional(),
    skip: z.number().optional(),
    orderKey: z.string().optional(),
    order: z.string().optional(),
  }),
);

export const UpdateFilmWatchCounterInputSchemaRef = schemaRef(
  'UpdateFilmWatchCounterInputSchemaRef',
  z.object({
    counter: z.number().min(0).max(1000),
  }),
);

export type GetFilmsListQuery = InferSchema<typeof GetFilmsListQuerySchemaRef>;
export type SearchFilmsQuery = InferSchema<typeof SearchFilmsQuerySchemaRef>;
export type GetFilmOptionsQuery = InferSchema<typeof GetFilmOptionsQuerySchemaRef>;
export type GetFilmRelatedChapters = InferSchema<typeof GetFilmRelatedChaptersSchemaRef>;
export type GetAdminListQuery = InferSchema<typeof GetAdminListQuerySchemaRef>;
export type UpdateFilmWatchCounterInput = InferSchema<typeof UpdateFilmWatchCounterInputSchemaRef>;
