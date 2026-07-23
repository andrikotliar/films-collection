import {
  IdParamSchema,
  GetFilmOptionsQuerySchema,
  GetFilmsListQuerySchema,
  SearchFilmsQuerySchema,
  buildListOptionSchema,
  FilmsListResponseSchema,
  FilmsSearchResponseSchema,
  FilmsAdminListResponseSchema,
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
  FilmTrailersResponseSchema,
  GetAdminListQuerySchema,
  FilmStatsResponseSchema,
  FilmsByCollectionResponseSchema,
  DeleteFilmDrafts,
} from '@films-collection/shared';
import { z } from 'zod';
import { defineContracts } from '~/helpers/index.js';

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
  getFilmStats: {
    method: 'GET',
    url: 'stats',
    schema: {
      response: FilmStatsResponseSchema,
    },
  },
  getAdminList: {
    method: 'GET',
    url: 'admin',
    schema: {
      querystring: GetAdminListQuerySchema,
      response: FilmsAdminListResponseSchema,
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
  getTrailers: {
    method: 'GET',
    url: ':id/trailers',
    schema: {
      params: IdParamSchema,
      response: FilmTrailersResponseSchema,
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
  getByCollection: {
    method: 'GET',
    url: 'collection/:id',
    schema: {
      params: IdParamSchema,
      response: FilmsByCollectionResponseSchema,
    },
  },
  getAdminFilmById: {
    method: 'GET',
    url: 'admin/film/:id',
    schema: {
      params: IdParamSchema,
      response: FilmResponseSchema,
    },
  },
  deleteAllFilmDrafts: {
    method: 'DELETE',
    url: 'admin/film/:filmId/drafts',
    schema: {
      params: FilmDraftFilmIdParamsSchema,
      response: DeleteFilmDrafts,
    },
  },
});
