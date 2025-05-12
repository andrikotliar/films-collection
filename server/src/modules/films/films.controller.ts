import { NotFoundException, router } from '../../common';
import {
  FilmsAdminGetListQuerySchema,
  FilmsGetParamsSchema,
  FilmsQuerySchema,
  FilmsRelatedChaptersSchema,
  FilmsSearchQuerySchema,
} from './schemas';

export const FilmsController = router((app, defineRoute) => [
  defineRoute({
    method: 'GET',
    url: '/',
    schema: {
      querystring: FilmsQuerySchema,
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
      querystring: FilmsSearchQuerySchema,
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
      querystring: FilmsAdminGetListQuerySchema,
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
    url: '/chapters',
    preHandler: [app.authenticate],
    schema: {
      querystring: FilmsRelatedChaptersSchema,
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
    schema: { params: FilmsGetParamsSchema },
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
]);
