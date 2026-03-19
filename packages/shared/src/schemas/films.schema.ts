import z from 'zod';
import { PersonRole, TitleStyle, TitleType } from '~/enums';
import { getArrayFromQuery, getBoolFromQuery } from '~/helpers';
import { AwardResponseSchema, NominationResponseSchema } from '~/schemas/awards.schema';
import { CollectionResponseSchema } from '~/schemas/collections.schema';
import { CountryResponseSchema } from '~/schemas/countries.schema';
import { GenreResponseSchema } from '~/schemas/genres.schema';
import { PersonResponseSchema } from '~/schemas/people.schema';
import { StudioResponseSchema } from '~/schemas/studios.schema';

const DateStringSchema = z
  .string()
  .regex(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/, 'Date must be in YYYY-MM-DD format');

const SeriesExtensionSchema = z.object({
  episodesTotal: z.coerce.number(),
  seasonsTotal: z.coerce.number(),
  finishedAt: DateStringSchema.nullable(),
});

export const CreateFilmInputSchema = z.object({
  title: z.string().nonempty(),
  type: z.enum(TitleType),
  style: z.enum(TitleStyle),
  rating: z.coerce.number().min(1).max(3),
  poster: z.string().optional().nullable(),
  genres: z.array(z.number()),
  studios: z.array(z.number()),
  countries: z.array(z.number()),
  collections: z.array(z.number()),
  duration: z.coerce.number(),
  releaseDate: DateStringSchema,
  budget: z.coerce.number(),
  boxOffice: z.coerce.number(),
  overview: z.string().optional().nullable(),
  chapterKey: z
    .string()
    .regex(/^[a-z-]+$/)
    .nullable(),
  chapterOrder: z.coerce.number().nullable(),
  castAndCrew: z.array(
    z.object({
      personId: z.coerce.number().min(1, 'Person cannot be empty'),
      comment: z.string().nullable(),
      role: z.enum(PersonRole),
      details: z.string().nullable(),
    }),
  ),
  awards: z.array(
    z.object({
      awardId: z.number().min(1, 'Award cannot be empty'),
      nominationId: z.number().min(1, 'Nomination cannot be empty'),
      comment: z.string().nullable(),
      actorId: z.number().nullable(),
    }),
  ),
  trailers: z.array(
    z.object({
      order: z.number(),
      url: z.string(),
    }),
  ),
  draft: z.boolean(),
  pendingFilmId: z.coerce.number().nullable().optional(),
  seriesExtension: SeriesExtensionSchema.nullable(),
});

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
  q: z.string().optional().nullable(),
  orderKey: z.string().optional(),
  order: z.enum(['asc', 'desc']).optional(),
});

export const SearchFilmsQuerySchema = z.object({
  q: z.string().nullable().optional(),
});

export const GetFilmOptionsQuerySchema = z.object({
  q: z.string().optional(),
  selected: getArrayFromQuery(z.coerce.number()).optional(),
});

export const GetFilmRelatedChaptersSchema = z.object({
  key: z.string(),
});

const TrailerSchema = z.object({
  id: z.coerce.number(),
  filmId: z.coerce.number(),
  url: z.string(),
  order: z.coerce.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

const ChapterSchema = z.object({
  id: z.coerce.number(),
  title: z.string(),
  poster: z.string().nullable(),
  chapterOrder: z.coerce.number().nullable(),
});

export const FilmResponseSchema = z.object({
  ...ChapterSchema.shape,
  type: z.enum(TitleType),
  duration: z.coerce.number(),
  overview: z.string().nullable(),
  rating: z.coerce.number(),
  releaseDate: z.string(),
  budget: z.coerce.number().nullable(),
  boxOffice: z.coerce.number().nullable(),
  draft: z.boolean(),
  chapterKey: z.string().nullable(),
  genres: z.array(GenreResponseSchema.omit({ createdAt: true, updatedAt: true })),
  studios: z.array(StudioResponseSchema.omit({ createdAt: true, updatedAt: true })),
  countries: z.array(CountryResponseSchema.omit({ createdAt: true, updatedAt: true })),
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
      finishedAt: z.string().nullable(),
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
  list: z.array(
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
  list: z.array(FilmResponseSchema.pick({ id: true, title: true, draft: true, poster: true })),
  total: z.coerce.number(),
});

export const FilmChaptersResponseSchema = z.array(
  FilmResponseSchema.pick({ id: true, title: true, poster: true, chapterOrder: true }),
);

export const UpdateFilmInputSchema = CreateFilmInputSchema.partial()
  .omit({
    seriesExtension: true,
    pendingFilmId: true,
  })
  .extend({
    seriesExtension: SeriesExtensionSchema.partial().nullable().optional(),
  });

export const GetCompleteDataListQuerySchema = z.object({
  newestOnly: getBoolFromQuery.optional(),
  intervalDays: z.coerce.number().optional(),
});

export const CompleteDataListItemSchema = z.object({
  ...FilmResponseSchema.pick({
    id: true,
    title: true,
    releaseDate: true,
    type: true,
    duration: true,
    budget: true,
    boxOffice: true,
    overview: true,
    chapterKey: true,
    chapterOrder: true,
    poster: true,
  }).shape,
  genres: z.array(GenreResponseSchema.pick({ title: true, id: true })),
  style: z.enum(TitleStyle),
  countries: z.array(CountryResponseSchema.pick({ title: true, id: true })),
  studios: z.array(StudioResponseSchema.pick({ title: true, id: true })),
  trailers: z.array(TrailerSchema.pick({ url: true, order: true, id: true })),
  awards: z.array(
    z.object({
      id: z.number(),
      title: z.string(),
      nominations: z.array(NominationResponseSchema.pick({ title: true, id: true })),
    }),
  ),
  castAndCrew: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      role: z.enum(PersonRole),
      details: z.string().nullable(),
    }),
  ),
  seriesExtension: z
    .object({
      id: z.number(),
      episodesTotal: z.number(),
      seasonsTotal: z.number(),
      finishedAt: z.string().nullable(),
    })
    .optional(),
});

export const CompleteDataResponseSchema = z.object({
  list: z.array(CompleteDataListItemSchema),
  baseData: z.object({
    genres: z.array(GenreResponseSchema.pick({ title: true, id: true })),
    countries: z.array(CountryResponseSchema.pick({ title: true, id: true })),
    studios: z.array(StudioResponseSchema.pick({ title: true, id: true })),
    people: z.array(PersonResponseSchema.pick({ name: true, id: true })),
    awards: z.array(
      z.object({
        ...AwardResponseSchema.pick({ id: true, title: true }).shape,
        nominations: z.array(NominationResponseSchema.omit({ createdAt: true, updatedAt: true })),
      }),
    ),
  }),
});

export type GetFilmsListQuery = z.infer<typeof GetFilmsListQuerySchema>;
export type SearchFilmsQuery = z.infer<typeof SearchFilmsQuerySchema>;
export type GetFilmOptionsQuery = z.infer<typeof GetFilmOptionsQuerySchema>;
export type GetCompleteDataListQuery = z.infer<typeof GetCompleteDataListQuerySchema>;
export type GetFilmRelatedChapters = z.infer<typeof GetFilmRelatedChaptersSchema>;
export type CreateFilmInput = z.infer<typeof CreateFilmInputSchema>;
export type UpdateFilmInput = z.infer<typeof UpdateFilmInputSchema>;
export type CompleteDataListItem = z.infer<typeof CompleteDataListItemSchema>;
export type CompleteDataResponse = z.infer<typeof CompleteDataResponseSchema>;
