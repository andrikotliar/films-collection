import z from 'zod';
import { PersonRole, TitleStyle, TitleType } from '~/enums';
import { AwardResponseSchema } from '~/schemas/awards.schema';
import { CollectionResponseSchema } from '~/schemas/collections.schema';
import { CountryResponseSchema } from '~/schemas/countries.schema';
import { GenreResponseSchema } from '~/schemas/genres.schema';
import { StudioResponseSchema } from '~/schemas/studios.schema';

export const GetFilmsListQuerySchema = z.object({
  pageIndex: z.number().min(0).optional(),
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

const TrailerSchema = z.object({
  id: z.number(),
  filmId: z.number(),
  videoId: z.string(),
  order: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

const ChapterSchema = z.object({
  id: z.number(),
  title: z.string(),
  poster: z.string(),
  chapterOrder: z.number().nullable(),
});

export const FilmResponseSchema = z.object({
  ...ChapterSchema.shape,
  type: z.enum(TitleType),
  duration: z.number(),
  description: z.string().nullable(),
  rating: z.number(),
  watchCounter: z
    .object({
      realCounter: z.number().nullable(),
      approxCounter: z.number().nullable(),
    })
    .nullable(),
  releaseDate: z.date(),
  budget: z.number().nullable(),
  boxOffice: z.number().nullable(),
  draft: z.boolean(),
  chapterKey: z.string().nullable(),
  genres: z.array(GenreResponseSchema),
  studios: z.array(StudioResponseSchema),
  countries: z.array(CountryResponseSchema),
  collections: z.array(CollectionResponseSchema.pick({ id: true, title: true })),
  trailers: z.array(TrailerSchema),
  chapters: z.array(ChapterSchema),
  seriesExtension: z
    .object({
      episodesTotal: z.number(),
      seasonsTotal: z.number(),
      finishedAt: z.date().nullable(),
    })
    .nullable(),
  castAndCrew: z.array(
    z.object({
      role: z.enum(PersonRole),
      people: z.array(
        z.object({
          id: z.number(),
          name: z.string(),
          comment: z.string().nullable(),
          details: z.string().nullable(),
        }),
      ),
    }),
  ),
});

export const FilmsListResponseSchema = z.object({
  films: z.array(
    FilmResponseSchema.pick({ id: true, title: true, poster: true, releaseDate: true }),
  ),
  total: z.number(),
  additionalInfo: z
    .object({
      type: z.enum(['crew']),
      data: z.object({
        role: z.string(),
        name: z.string(),
      }),
    })
    .nullable()
    .or(
      z
        .object({
          type: z.enum(['collection']),
          data: CollectionResponseSchema,
        })
        .nullable(),
    )
    .or(
      z
        .object({
          type: z.enum(['award']),
          data: AwardResponseSchema.omit({ createdAt: true, updatedAt: true }),
        })
        .nullable(),
    ),
});

export const FilmsSearchResponseSchema = z.array(
  FilmResponseSchema.pick({ id: true, title: true, poster: true, releaseDate: true, genres: true }),
);

export const FilmsAdminListResponseSchema = z.object({
  films: z.array(FilmResponseSchema.pick({ id: true, title: true, draft: true })),
  total: z.number(),
});

export const FilmAdminResponseSchema = FilmResponseSchema.pick({
  id: true,
  title: true,
}).nullable();

export const FilmChaptersResponseSchema = z.array(
  FilmResponseSchema.pick({ id: true, title: true, poster: true, chapterOrder: true }),
);

export type GetFilmsListQuery = z.infer<typeof GetFilmsListQuerySchema>;
export type SearchFilmsQuery = z.infer<typeof SearchFilmsQuerySchema>;
export type GetFilmOptionsQuery = z.infer<typeof GetFilmOptionsQuerySchema>;
export type GetFilmRelatedChapters = z.infer<typeof GetFilmRelatedChaptersSchema>;
export type GetAdminListQuery = z.infer<typeof GetAdminListQuerySchema>;
export type UpdateFilmWatchCounterInput = z.infer<typeof UpdateFilmWatchCounterInputSchema>;
