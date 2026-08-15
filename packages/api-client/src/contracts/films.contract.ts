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
  GetFilmByCollectionNameSchema,
  GetFilmByCollectionNameResponse,
} from '@films-collection/shared';
import { z } from 'zod';
import { createContract } from '~/helpers/index.js';

export const filmsContract = {
  getList: createContract({
    method: 'GET',
    url: '',
    schema: {
      querystring: GetFilmsListQuerySchema,
      response: FilmsListResponseSchema,
    },
  }),
  search: createContract({
    method: 'GET',
    url: 'search',
    schema: {
      querystring: SearchFilmsQuerySchema,
      response: FilmsSearchResponseSchema,
    },
  }),
  getOptions: createContract({
    method: 'GET',
    url: 'options',
    schema: {
      querystring: GetFilmOptionsQuerySchema,
      response: buildListOptionSchema(z.number()),
    },
  }),
  getFilmStats: createContract({
    method: 'GET',
    url: 'stats',
    schema: {
      response: FilmStatsResponseSchema,
    },
  }),
  getAdminList: createContract({
    method: 'GET',
    url: 'admin',
    schema: {
      querystring: GetAdminListQuerySchema,
      response: FilmsAdminListResponseSchema,
    },
  }),
  getEditableFilm: createContract({
    method: 'GET',
    url: 'admin/:id',
    schema: {
      params: IdParamSchema,
      response: CreateFilmInputSchema,
    },
  }),
  export: createContract({
    method: 'GET',
    url: 'export',
    schema: {
      querystring: GetCompleteDataListQuerySchema,
      response: CompleteDataResponseSchema,
    },
  }),
  getById: createContract({
    method: 'GET',
    url: ':id',
    schema: {
      params: IdParamSchema,
      response: FilmResponseSchema,
    },
  }),
  getTrailers: createContract({
    method: 'GET',
    url: ':id/trailers',
    schema: {
      params: IdParamSchema,
      response: FilmTrailersResponseSchema,
    },
  }),
  create: createContract({
    method: 'POST',
    url: 'admin',
    schema: {
      body: CreateFilmInputSchema,
      response: FilmResponseSchema,
    },
  }),
  update: createContract({
    method: 'PATCH',
    url: 'admin/:id',
    schema: {
      body: UpdateFilmInputSchema,
      params: IdParamSchema,
      response: FilmResponseSchema,
    },
  }),
  delete: createContract({
    method: 'DELETE',
    url: 'admin/:id',
    schema: {
      params: IdParamSchema,
      response: IdParamSchema,
    },
  }),
  translateDescription: createContract({
    method: 'POST',
    url: 'admin/translate',
    schema: {
      body: TranslateDescriptionInputSchema,
      response: TranslateDescriptionResponseSchema,
    },
  }),
  createDraft: createContract({
    method: 'POST',
    url: 'admin/:filmId/draft',
    schema: {
      params: FilmDraftFilmIdParamsSchema,
      body: CreateFilmDraftInputSchema,
      response: FilmDraftInputResponse,
    },
  }),
  updateDraft: createContract({
    method: 'PATCH',
    url: 'admin/draft/:id',
    schema: {
      params: IdParamSchema,
      body: CreateFilmDraftInputSchema,
      response: FilmDraftInputResponse,
    },
  }),
  getFilmDrafts: createContract({
    method: 'GET',
    url: 'admin/:filmId/draft',
    schema: {
      params: FilmDraftFilmIdParamsSchema,
      response: z.array(FilmDraftInputResponse),
    },
  }),
  deleteDraft: createContract({
    method: 'DELETE',
    url: 'admin/draft/:id',
    schema: {
      params: IdParamSchema,
      response: IdParamSchema,
    },
  }),
  getByCollection: createContract({
    method: 'GET',
    url: 'collection/:id',
    schema: {
      params: IdParamSchema,
      response: FilmsByCollectionResponseSchema,
    },
  }),
  getAdminFilmById: createContract({
    method: 'GET',
    url: 'admin/film/:id',
    schema: {
      params: IdParamSchema,
      response: FilmResponseSchema,
    },
  }),
  deleteAllFilmDrafts: createContract({
    method: 'DELETE',
    url: 'admin/film/:filmId/drafts',
    schema: {
      params: FilmDraftFilmIdParamsSchema,
      response: DeleteFilmDrafts,
    },
  }),
  getFilmByCollectionName: createContract({
    method: 'GET',
    url: 'collection',
    schema: {
      querystring: GetFilmByCollectionNameSchema,
      response: GetFilmByCollectionNameResponse,
    },
  }),
};
