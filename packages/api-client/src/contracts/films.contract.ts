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
});
