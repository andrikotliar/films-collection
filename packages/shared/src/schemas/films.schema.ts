import z from 'zod';
import { PersonRole, TitleStyle, TitleType } from '~/enums';
import { getArrayFromQuery } from '~/helpers';
import { AwardResponseSchema } from '~/schemas/awards.schema';
import { CollectionResponseSchema } from '~/schemas/collections.schema';
import { CountryResponseSchema } from '~/schemas/countries.schema';
import { GenreResponseSchema } from '~/schemas/genres.schema';
import { PersonResponseSchema } from '~/schemas/people.schema';
import { StudioResponseSchema } from '~/schemas/studios.schema';

export const GetFilmsListQuerySchema = z.object({
  pageIndex: z.coerce.number().min(0).optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  collectionId: z.coerce.number().optional(),
  duration: z.coerce.number().optional(),
  rating: z.coerce.number().optional(),
  seasonsTotal: z.coerce.number().optional(),
  episodesTotal: z.coerce.number().optional(),
  personId: z.coerce.number().optional(),
  awardId: z.coerce.number().optional(),
  budget: z.coerce.number().optional(),
  boxOffice: z.coerce.number().optional(),
  type: z.enum(TitleType).optional(),
  style: z.enum(TitleStyle).optional(),
  personRole: z.enum(PersonRole).optional(),
  genreIds: getArrayFromQuery(z.coerce.number()).optional(),
  studioIds: getArrayFromQuery(z.coerce.number()).optional(),
  countryIds: getArrayFromQuery(z.coerce.number()).optional(),
});

export const SearchFilmsQuerySchema = z.object({
  q: z.string().nullable().optional(),
});

export const GetFilmOptionsQuerySchema = z.object({
  q: z.string().optional(),
  selected: getArrayFromQuery(z.coerce.number()).optional(),
});

export const GetFilmRelatedChaptersSchema = z.object({
  id: z.coerce.number(),
  key: z.string(),
});

export const GetAdminListQuerySchema = z
  .object({
    q: z.string().optional().nullable(),
    pageIndex: z.coerce.number().optional(),
    orderKey: z.string().optional(),
    order: z.enum(['asc', 'desc']).optional(),
  })
  .partial();

export const UpdateFilmWatchCounterInputSchema = z.object({
  counter: z.coerce.number().min(0).max(1000),
});

const TrailerSchema = z.object({
  id: z.coerce.number(),
  filmId: z.coerce.number(),
  videoId: z.string(),
  order: z.coerce.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

const ChapterSchema = z.object({
  id: z.coerce.number(),
  title: z.string(),
  poster: z.string(),
  chapterOrder: z.coerce.number().nullable(),
});

export const FilmResponseSchema = z.object({
  ...ChapterSchema.shape,
  type: z.enum(TitleType),
  duration: z.coerce.number(),
  description: z.string().nullable(),
  rating: z.coerce.number(),
  watchCounter: z
    .object({
      realCounter: z.coerce.number().nullable(),
      approxCounter: z.coerce.number().nullable(),
    })
    .nullable(),
  releaseDate: z.date(),
  budget: z.coerce.number().nullable(),
  boxOffice: z.coerce.number().nullable(),
  draft: z.boolean(),
  chapterKey: z.string().nullable(),
  genres: z.array(GenreResponseSchema),
  studios: z.array(StudioResponseSchema),
  countries: z.array(CountryResponseSchema),
  collections: z.array(CollectionResponseSchema.pick({ id: true, title: true })),
  trailers: z.array(TrailerSchema),
  chapters: z.array(ChapterSchema),
  awards: z.array(
    z.object({
      award: AwardResponseSchema.pick({ id: true, title: true }),
      nominations: z.array(
        z.object({
          title: z.string(),
          comment: z.string().nullable(),
          person: PersonResponseSchema.pick({ id: true, name: true }).nullable(),
        }),
      ),
    }),
  ),
  seriesExtension: z
    .object({
      episodesTotal: z.coerce.number(),
      seasonsTotal: z.coerce.number(),
      finishedAt: z.date().nullable(),
    })
    .nullable(),
  castAndCrew: z.array(
    z.object({
      role: z.enum(PersonRole),
      people: z.array(
        z.object({
          id: z.coerce.number(),
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
  total: z.coerce.number(),
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
  total: z.coerce.number(),
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
