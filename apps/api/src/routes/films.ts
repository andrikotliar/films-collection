import { IdParamSchema, NotFoundException, defineRoute, useRoutes } from '~/lib';
import {
  GetAdminFilmParamsSchema,
  GetAdminListQuerySchema,
  GetFilmOptionsSchema,
  GetFilmRelatedChaptersSchema,
  GetFilmsListQuerySchema,
  SearchFilmsQuerySchema,
  UpdateFilmWatchCounterSchema,
} from '~/services/films';

export const filmsRoutes = useRoutes('films', [
  defineRoute({
    method: 'GET',
    url: '/',
    schema: {
      querystring: GetFilmsListQuerySchema,
    },
    handler: async ({ request, app }) => {
      const data = await app.container.resolve('filmsService').getFilteredFilms(request.query);

      return data;
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

      return data;
    },
  }),

  defineRoute({
    method: 'GET',
    url: '/options',
    schema: {
      querystring: GetFilmOptionsSchema,
    },
    handler: async ({ request, app }) => {
      const data = await app.container.resolve('filmsService').getFilmOptions(request.query);

      return data;
    },
  }),

  defineRoute({
    method: 'GET',
    url: '/admin',
    isPrivate: true,
    schema: {
      querystring: GetAdminListQuerySchema,
    },
    handler: async ({ request, app }) => {
      const data = await app.container.resolve('filmsService').getAdminList(request.query);

      return data;
    },
  }),

  defineRoute({
    method: 'GET',
    url: '/admin/:id',
    isPrivate: true,
    schema: {
      params: GetAdminFilmParamsSchema,
    },
    handler: async ({ request, app }) => {
      const data = await app.container
        .resolve('filmsService')
        .getFilmDetailsAdmin(request.params.id);

      return data;
    },
  }),

  defineRoute({
    method: 'GET',
    url: '/chapters',
    isPrivate: true,
    schema: {
      querystring: GetFilmRelatedChaptersSchema,
    },
    handler: async ({ request, app }) => {
      const data = await app.container.resolve('filmsService').getRelatedChapters(request.query);

      return data;
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

      return data;
    },
  }),

  defineRoute({
    method: 'PATCH',
    url: '/admin/:id/counter',
    schema: {
      params: IdParamSchema,
      body: UpdateFilmWatchCounterSchema,
    },
    isPrivate: true,
    handler: async ({ request, app }) => {
      return await app.container
        .resolve('filmsService')
        .updateFilmWatchCount(request.params.id, request.body.counter);
    },
  }),

  defineRoute({
    method: 'DELETE',
    url: '/admin/:id',
    schema: { params: IdParamSchema },
    handler: async ({ request }) => {
      return { id: request.params.id };
    },
  }),
]);
