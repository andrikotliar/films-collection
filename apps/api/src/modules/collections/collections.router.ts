import { collectionsContract } from '@films-collection/api-client';
import { createRouter, validateAuth } from '~/shared';

export const collectionsRouter = createRouter(collectionsContract, {
  getList: {
    handler: async ({ app }) => {
      const data = await app.container.resolve('collectionsService').getGeneralDataList();

      return { data };
    },
  },

  create: {
    preHandler: [validateAuth],
    handler: async ({ request, app }) => {
      const data = await app.container.resolve('collectionsService').createCollection(request.body);

      return { data };
    },
  },

  update: {
    preHandler: [validateAuth],
    handler: async ({ request, app }) => {
      const data = await app.container
        .resolve('collectionsService')
        .updateCollection(request.params.id, request.body);

      return { data };
    },
  },

  delete: {
    preHandler: [validateAuth],
    handler: async ({ request, app }) => {
      await app.container.resolve('collectionsService').deleteCollection(request.params.id);

      return { data: { id: request.params.id } };
    },
  },
});
