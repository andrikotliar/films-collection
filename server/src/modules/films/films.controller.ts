import { IdParamSchema, NotFoundException, router } from '../../common';
import {
  GetAdminListQuerySchema,
  GetFilmsListQuerySchema,
  GetFilmRelatedChaptersSchema,
  SearchFilmsQuerySchema,
  GetAdminFilmParamsSchema,
  DeleteFilmParamsSchema,
} from './schemas';

export const FilmsController = router((app, defineRoute) => [
  defineRoute({
    method: 'GET',
    url: '/',
    schema: {
      querystring: GetFilmsListQuerySchema,
    },
    handler: async ({ request }) => {
      const data = await app.filmsService.getFilteredFilms(request.query);

      return {
        status: 'OK',
        data,
      };
    },
  }),

  defineRoute({
    method: 'GET',
    url: '/search',
    schema: {
      querystring: SearchFilmsQuerySchema,
    },
    handler: async ({ request }) => {
      const data = await app.filmsService.searchFilm(request.query.q);

      return {
        status: 'OK',
        data,
      };
    },
  }),

  defineRoute({
    method: 'GET',
    url: '/admin',
    preHandler: [app.authenticate],
    schema: {
      querystring: GetAdminListQuerySchema,
    },
    handler: async ({ request }) => {
      const data = await app.filmsService.getAdminList(request.query);

      return {
        status: 'OK',
        data,
      };
    },
  }),

  defineRoute({
    method: 'GET',
    url: '/admin/:id',
    preHandler: [app.authenticate],
    schema: {
      params: GetAdminFilmParamsSchema,
    },
    handler: async ({ request }) => {
      const data = await app.filmsService.getFilmDetailsAdmin(
        request.params.id,
      );

      return {
        status: 'OK',
        data,
      };
    },
  }),

  defineRoute({
    method: 'GET',
    url: '/chapters',
    preHandler: [app.authenticate],
    schema: {
      querystring: GetFilmRelatedChaptersSchema,
    },
    handler: async ({ request }) => {
      const data = await app.filmsService.getRelatedChapters(request.query);

      return {
        status: 'OK',
        data,
      };
    },
  }),

  defineRoute({
    method: 'GET',
    url: '/:id',
    schema: { params: IdParamSchema },
    handler: async ({ request }) => {
      const data = await app.filmsService.getFilmDetails(request.params.id);

      if (!data) {
        throw new NotFoundException({
          message: `Film with the ${request.params.id} not found`,
        });
      }

      return {
        status: 'OK',
        data,
      };
    },
  }),
  defineRoute({
    method: 'DELETE',
    url: '/admin/:id',
    preHandler: [app.authenticate],
    schema: {
      params: DeleteFilmParamsSchema,
    },
    handler: async ({ request }) => {
      const data = await app.filmsService.deleteFilm(request.params.id);

      return {
        status: 'OK',
        data: {
          id: data.id,
        },
      };
    },
  }),
]);
