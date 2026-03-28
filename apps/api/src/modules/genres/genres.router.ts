import { createRouter, validateAuth } from '~/shared';
import { genresContract } from '@films-collection/api-client';

export const genresRouter = createRouter(genresContract, {
  getList: {
    handler: async ({ app }) => {
      const data = await app.container.resolve('genresService').getBaseListData();

      return { data };
    },
  },

  create: {
    preHandler: [validateAuth],
    handler: async ({ request, app }) => {
      const data = await app.container.resolve('genresService').createGenre(request.body);

      return { data, status: 'CREATED' };
    },
  },

  update: {
    preHandler: [validateAuth],
    handler: async ({ request, app }) => {
      const data = await app.container
        .resolve('genresService')
        .updateGenre(request.params.id, request.body);

      return { data };
    },
  },

  delete: {
    preHandler: [validateAuth],
    handler: async ({ request, app }) => {
      await app.container.resolve('genresService').deleteGenre(request.params.id);

      return {
        data: { id: request.params.id },
      };
    },
  },
});
