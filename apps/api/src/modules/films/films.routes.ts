import { IdParamSchema, NotFoundException, defineRoute, useRoutes } from '~/common';
import {
  GetAdminListQuerySchema,
  GetFilmsListQuerySchema,
  GetFilmRelatedChaptersSchema,
  SearchFilmsQuerySchema,
  GetAdminFilmParamsSchema,
  GetFilmOptionsSchema,
  UpdateFilmWatchCounterSchema,
} from './schemas';
import { films } from '~/modules/films/films.module';

export const filmsRoutes = useRoutes('films', [
  defineRoute({
    method: 'GET',
    url: '/',
    schema: {
      querystring: GetFilmsListQuerySchema,
    },
    handler: async ({ request }) => {
      const data = await films.getFilteredFilms(request.query);

      return data;
    },
  }),

  defineRoute({
    method: 'GET',
    url: '/search',
    schema: {
      querystring: SearchFilmsQuerySchema,
    },
    handler: async ({ request }) => {
      const data = await films.searchFilm(request.query.q);

      return data;
    },
  }),

  defineRoute({
    method: 'GET',
    url: '/options',
    schema: {
      querystring: GetFilmOptionsSchema,
    },
    handler: async ({ request }) => {
      const data = await films.getFilmOptions(request.query);

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
    handler: async ({ request }) => {
      const data = await films.getAdminList(request.query);

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
    handler: async ({ request }) => {
      const data = await films.getFilmDetailsAdmin(request.params.id);

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
    handler: async ({ request }) => {
      const data = await films.getRelatedChapters(request.query);

      return data;
    },
  }),

  defineRoute({
    method: 'GET',
    url: '/:id',
    schema: { params: IdParamSchema },
    handler: async ({ request }) => {
      const data = await films.getFilmDetails(request.params.id);

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
    handler: async ({ request }) => {
      return await films.updateFilmWatchCount(request.params.id, request.body.counter);
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
