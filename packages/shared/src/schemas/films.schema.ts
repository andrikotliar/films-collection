import z from 'zod';
import { PersonRole, TitleStyle, TitleType } from '~/enums';

export const GetFilmsListQuerySchema = z.object({
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
});

export const SearchFilmsQuerySchema = z.object({
  q: z.string(),
});

export const GetFilmOptionsQuerySchema = z.object({
  q: z.string().optional(),
  selected: z.array(z.number()).optional(),
});

export const GetFilmRelatedChaptersSchema = z.object({
  id: z.number(),
  key: z.string(),
});

export const GetAdminListQuerySchema = z.object({
  q: z.string().optional(),
  skip: z.number().optional(),
  orderKey: z.string().optional(),
  order: z.string().optional(),
});

export const UpdateFilmWatchCounterInputSchema = z.object({
  counter: z.number().min(0).max(1000),
});

export type GetFilmsListQuery = z.infer<typeof GetFilmsListQuerySchema>;
export type SearchFilmsQuery = z.infer<typeof SearchFilmsQuerySchema>;
export type GetFilmOptionsQuery = z.infer<typeof GetFilmOptionsQuerySchema>;
export type GetFilmRelatedChapters = z.infer<typeof GetFilmRelatedChaptersSchema>;
export type GetAdminListQuery = z.infer<typeof GetAdminListQuerySchema>;
export type UpdateFilmWatchCounterInput = z.infer<typeof UpdateFilmWatchCounterInputSchema>;
