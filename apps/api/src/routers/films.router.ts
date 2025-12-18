import { NotFoundException, defineRoute, createRouter, validateAuth } from '~/shared';
import {
  IdParamSchemaRef,
  GetAdminListQuerySchemaRef,
  GetFilmOptionsQuerySchemaRef,
  GetFilmRelatedChaptersSchemaRef,
  GetFilmsListQuerySchemaRef,
  SearchFilmsQuerySchemaRef,
  UpdateFilmWatchCounterInputSchemaRef,
} from '@films-collection/shared';

export default createRouter([
  defineRoute({
    method: 'GET',
    url: '/',
    schema: {
      querystring: GetFilmsListQuerySchemaRef,
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
      querystring: SearchFilmsQuerySchemaRef,
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
      querystring: GetFilmOptionsQuerySchemaRef,
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
      querystring: GetAdminListQuerySchemaRef,
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
      params: IdParamSchemaRef,
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
    url: '/chapters',
    preHandler: [validateAuth],
    schema: {
      querystring: GetFilmRelatedChaptersSchemaRef,
    },
    handler: async ({ request, app }) => {
      const data = await app.container.resolve('filmsService').getRelatedChapters(request.query);

      return { data };
    },
  }),

  defineRoute({
    method: 'GET',
    url: '/:id',
    schema: { params: IdParamSchemaRef },
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
    method: 'PATCH',
    url: '/admin/:id/counter',
    schema: {
      params: IdParamSchemaRef,
      body: UpdateFilmWatchCounterInputSchemaRef,
    },
    preHandler: [validateAuth],
    handler: async ({ request, app }) => {
      const data = await app.container
        .resolve('filmsService')
        .updateFilmWatchCount(request.params.id, request.body.counter);

      return { data };
    },
  }),

  defineRoute({
    method: 'DELETE',
    url: '/admin/:id',
    schema: { params: IdParamSchemaRef },
    handler: async ({ request, app }) => {
      const data = await app.container.resolve('filmsService').deleteFilm(request.params.id);

      return { data };
    },
  }),
]);
