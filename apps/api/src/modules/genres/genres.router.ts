import { contracts } from '@films-collection/api-client';
import { createRouter } from '~/shared/helpers/create-router.js';
import { validateAuth } from '~/shared/pre-handlers/validate-auth.js';

export const genresRouter = createRouter(contracts.genres, {
  getList: {
    preHandler: [validateAuth],
    handler: async ({ app, request }) => {
      const data = await app.container.resolve('genresService').getBaseListData(request.query);

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
