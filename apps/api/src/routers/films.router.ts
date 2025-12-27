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
} from '@films-collection/shared';
import z from 'zod';

export default createRouter([
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
    },
    handler: async ({ request, app }) => {
      const data = await app.container
        .resolve('filmsService')
        .getFilmDetailsAdmin(request.params.id);

      return { data };
    },
  }),

  defineRoute({
    method: 'GET',
    url: '/:id/chapters/:key',
    preHandler: [validateAuth],
    schema: {
      params: GetFilmRelatedChaptersSchema,
    },
    handler: async ({ request, app }) => {
      const data = await app.container
        .resolve('filmsService')
        .getRelatedChapters(request.params.id, request.params.key);

      return { data };
    },
  }),

  defineRoute({
    method: 'GET',
    url: '/:id',
    schema: { params: IdParamSchema },
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
    method: 'DELETE',
    url: '/admin/:id',
    schema: { params: IdParamSchema, response: IdParamSchema },
    handler: async ({ request, app }) => {
      const data = await app.container.resolve('filmsService').deleteFilm(request.params.id);

      return { data };
    },
  }),
]);
