import { defineRoute, createRouter, validateAuth } from '~/shared';
import {
  IdParamSchema,
  GenreInputSchema,
  GenresListResponseSchema,
  GenreResponseSchema,
} from '@films-collection/shared';

export const genresRouter = createRouter([
  defineRoute({
    method: 'GET',
    url: '/',
    schema: {
      response: GenresListResponseSchema,
    },
    handler: async ({ app }) => {
      const data = await app.container.resolve('genresService').getBaseListData();

      return { data };
    },
  }),

  defineRoute({
    method: 'POST',
    url: '/',
    schema: {
      body: GenreInputSchema,
      response: GenreResponseSchema,
    },

    preHandler: [validateAuth],
    handler: async ({ request, app }) => {
      const data = await app.container.resolve('genresService').createGenre(request.body);

      return { data, status: 'CREATED' };
    },
  }),

  defineRoute({
    method: 'PATCH',
    url: '/:id',
    schema: {
      params: IdParamSchema,
      body: GenreInputSchema,
      response: GenreResponseSchema,
    },
    preHandler: [validateAuth],
    handler: async ({ request, app }) => {
      const data = await app.container
        .resolve('genresService')
        .updateGenre(request.params.id, request.body);

      return { data };
    },
  }),

  defineRoute({
    method: 'DELETE',
    url: '/:id',
    schema: {
      params: IdParamSchema,
      response: IdParamSchema,
    },
    preHandler: [validateAuth],
    handler: async ({ request, app }) => {
      await app.container.resolve('genresService').deleteGenre(request.params.id);

      return {
        data: { id: request.params.id },
      };
    },
  }),
]);
