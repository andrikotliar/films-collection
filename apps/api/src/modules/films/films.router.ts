import { NotFoundException, defineRoute, createRouter, validateAuth } from '~/shared';
import {
  IdParamSchema,
  GetAdminListQuerySchema,
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
} from '@films-collection/shared';
import z from 'zod';

export const filmsRouter = createRouter([
  defineRoute({
    method: 'GET',
    url: '/',
    schema: {
      querystring: GetFilmsListQuerySchema,
      response: FilmsListResponseSchema,
    },
    handler: async ({ request, app }) => {
      const data = await app.container.resolve('filmsService').getFilteredFilms(request.query);

      return { data };
    },
  }),

  defineRoute({
    method: 'GET',
    url: '/search',
    schema: {
      querystring: SearchFilmsQuerySchema,
      response: FilmsSearchResponseSchema,
    },
    handler: async ({ request, app }) => {
      const data = await app.container.resolve('filmsService').searchFilm(request.query.q);

      return { data };
    },
  }),

  defineRoute({
    method: 'GET',
    url: '/options',
    schema: {
      querystring: GetFilmOptionsQuerySchema,
      response: buildListOptionSchema(z.number()),
    },
    handler: async ({ request, app }) => {
      const data = await app.container.resolve('filmsService').getFilmOptions(request.query);

      return { data };
    },
  }),

  defineRoute({
    method: 'GET',
    url: '/admin',
    preHandler: [validateAuth],
    schema: {
      querystring: GetAdminListQuerySchema,
      response: FilmsAdminListResponseSchema,
    },
    handler: async ({ request, app }) => {
      const data = await app.container.resolve('filmsService').getAdminList(request.query);

      return { data };
    },
  }),

  defineRoute({
    method: 'GET',
    url: '/admin/:id',
    preHandler: [validateAuth],
    schema: {
      params: IdParamSchema,
      response: CreateFilmInputSchema,
    },
    handler: async ({ request, app }) => {
      const data = await app.container.resolve('filmsService').getEditableFilm(request.params.id);

      return { data };
    },
  }),

  defineRoute({
    method: 'GET',
    url: '/chapters/:key',
    preHandler: [validateAuth],
    schema: {
      params: GetFilmRelatedChaptersSchema,
      response: FilmChaptersResponseSchema,
    },
    handler: async ({ request, app }) => {
      const data = await app.container
        .resolve('filmsService')
        .getRelatedChapters(request.params.key);

      return { data };
    },
  }),

  defineRoute({
    method: 'GET',
    url: '/:id',
    schema: { params: IdParamSchema, response: FilmResponseSchema },
    handler: async ({ request, app }) => {
      const data = await app.container.resolve('filmsService').getFilmDetails(request.params.id);

      if (!data) {
        throw new NotFoundException({
          message: `Film with the ${request.params.id} not found`,
        });
      }

      return { data };
    },
  }),

  defineRoute({
    method: 'POST',
    url: '/admin',
    schema: { body: CreateFilmInputSchema, response: FilmResponseSchema },
    preHandler: [validateAuth],
    handler: async ({ request, app }) => {
      const data = await app.container.resolve('filmsService').createFilm(request.body);

      if (!data) {
        throw new NotFoundException({
          message: 'Create film not found',
        });
      }

      return { data, status: 'CREATED' };
    },
  }),

  defineRoute({
    method: 'PATCH',
    url: '/admin/:id',
    schema: { body: UpdateFilmInputSchema, params: IdParamSchema, response: FilmResponseSchema },
    preHandler: [validateAuth],
    handler: async ({ request, app }) => {
      const data = await app.container
        .resolve('filmsService')
        .updateFilm(request.params.id, request.body);

      if (!data) {
        throw new NotFoundException({
          message: `Film ${request.params.id} not found`,
        });
      }

      return { data };
    },
  }),

  defineRoute({
    method: 'DELETE',
    url: '/admin/:id',
    schema: { params: IdParamSchema, response: IdParamSchema },
    preHandler: [validateAuth],
    handler: async ({ request, app }) => {
      const data = await app.container.resolve('filmsService').deleteFilm(request.params.id);

      return { data };
    },
  }),
]);
