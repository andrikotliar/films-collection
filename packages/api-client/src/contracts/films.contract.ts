import {
  IdParamSchema,
  GetFilmOptionsQuerySchema,
  GetFilmRelatedChaptersSchema,
  GetFilmsListQuerySchema,
  SearchFilmsQuerySchema,
  buildListOptionSchema,
  FilmsListResponseSchema,
  FilmsSearchResponseSchema,
  FilmsAdminListResponseSchema,
  FilmChaptersResponseSchema,
  FilmResponseSchema,
  CreateFilmInputSchema,
  UpdateFilmInputSchema,
  GetCompleteDataListQuerySchema,
  CompleteDataResponseSchema,
  TranslateDescriptionInputSchema,
  TranslateDescriptionResponseSchema,
  CreateFilmDraftInputSchema,
  FilmDraftInputResponse,
  FilmDraftFilmIdParamsSchema,
  GetIncompleteFilmsQuerySchema,
  IncompleteFilmsListResponseSchema,
  GenerateFilmDescriptionInputSchema,
  GeneratedFilmDescriptionResponseSchema,
  GetFilmsCountResponse,
  GetUpcomingFilmsResponse,
} from '@films-collection/shared';
import z from 'zod';
import { defineContracts } from '~/helpers';

export const filmsContract = defineContracts('films', {
  getList: {
    method: 'GET',
    url: '',
    schema: {
      querystring: GetFilmsListQuerySchema,
      response: FilmsListResponseSchema,
    },
  },
  search: {
    method: 'GET',
    url: 'search',
    schema: {
      querystring: SearchFilmsQuerySchema,
      response: FilmsSearchResponseSchema,
    },
  },
  getOptions: {
    method: 'GET',
    url: 'options',
    schema: {
      querystring: GetFilmOptionsQuerySchema,
      response: buildListOptionSchema(z.number()),
    },
  },
  getAdminList: {
    method: 'GET',
    url: 'admin',
    schema: {
      querystring: GetFilmsListQuerySchema,
      response: FilmsAdminListResponseSchema,
    },
  },
  getUpcomingFilms: {
    method: 'GET',
    url: 'upcoming',
    schema: {
      response: GetUpcomingFilmsResponse,
    },
  },
  getCount: {
    method: 'GET',
    url: 'count',
    schema: {
      response: GetFilmsCountResponse,
    },
  },
  getAdminIncompleteFilmsList: {
    method: 'GET',
    url: 'admin/incomplete',
    schema: {
      querystring: GetIncompleteFilmsQuerySchema,
      response: IncompleteFilmsListResponseSchema,
    },
  },
  getEditableFilm: {
    method: 'GET',
    url: 'admin/:id',
    schema: {
      params: IdParamSchema,
      response: CreateFilmInputSchema,
    },
  },
  getRelatedChapters: {
    method: 'GET',
    url: 'chapters/:key',
    schema: {
      params: GetFilmRelatedChaptersSchema,
      response: FilmChaptersResponseSchema,
    },
  },
  export: {
    method: 'GET',
    url: 'export',
    schema: {
      querystring: GetCompleteDataListQuerySchema,
      response: CompleteDataResponseSchema,
    },
  },
  getById: {
    method: 'GET',
    url: ':id',
    schema: {
      params: IdParamSchema,
      response: FilmResponseSchema,
    },
  },
  create: {
    method: 'POST',
    url: 'admin',
    schema: {
      body: CreateFilmInputSchema,
      response: FilmResponseSchema,
    },
  },
  update: {
    method: 'PATCH',
    url: 'admin/:id',
    schema: {
      body: UpdateFilmInputSchema,
      params: IdParamSchema,
      response: FilmResponseSchema,
    },
  },
  delete: {
    method: 'DELETE',
    url: 'admin/:id',
    schema: {
      params: IdParamSchema,
      response: IdParamSchema,
    },
  },
  translateDescription: {
    method: 'POST',
    url: 'admin/translate',
    schema: {
      body: TranslateDescriptionInputSchema,
      response: TranslateDescriptionResponseSchema,
    },
  },
  generateDescription: {
    method: 'POST',
    url: 'admin/generate/description',
    schema: {
      body: GenerateFilmDescriptionInputSchema,
      response: GeneratedFilmDescriptionResponseSchema,
    },
  },
  createDraft: {
    method: 'POST',
    url: 'admin/:filmId/draft',
    schema: {
      params: FilmDraftFilmIdParamsSchema,
      body: CreateFilmDraftInputSchema,
      response: FilmDraftInputResponse,
    },
  },
  updateDraft: {
    method: 'PATCH',
    url: 'admin/draft/:id',
    schema: {
      params: IdParamSchema,
      body: CreateFilmDraftInputSchema,
      response: FilmDraftInputResponse,
    },
  },
  getFilmDrafts: {
    method: 'GET',
    url: 'admin/:filmId/draft',
    schema: {
      params: FilmDraftFilmIdParamsSchema,
      response: z.array(FilmDraftInputResponse),
    },
  },
  deleteDraft: {
    method: 'DELETE',
    url: 'admin/draft/:id',
    schema: {
      params: IdParamSchema,
      response: IdParamSchema,
    },
  },
});
