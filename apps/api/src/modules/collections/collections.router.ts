import { contracts } from '@films-collection/api-client';
import { createRouter } from '~/shared/helpers/create-router.js';
import { validateAuth } from '~/shared/pre-handlers/validate-auth.js';

export const collectionsRouter = createRouter(contracts.collections, {
  getList: {
    preHandler: [validateAuth],
    handler: async ({ app, request }) => {
      const data = await app.container
        .resolve('collectionsService')
        .getGeneralDataList(request.query);

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

  getAll: {
    preHandler: [validateAuth],
    handler: async ({ app }) => {
      const data = await app.container.resolve('collectionsService').getAllCollections();

      return { data };
    },
  },
});
