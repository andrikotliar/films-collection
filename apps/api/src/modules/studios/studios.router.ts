import { createRouter, validateAuth } from '~/shared';
import { studiosContract } from '@films-collection/api-client';

export const studiosRouter = createRouter(studiosContract, {
  getList: {
    handler: async ({ app }) => {
      const data = await app.container.resolve('studiosService').getBaseDataList();

      return { data };
    },
  },

  create: {
    preHandler: [validateAuth],
    handler: async ({ request, app }) => {
      const data = await app.container.resolve('studiosService').createStudio(request.body);

      return { data, status: 'CREATED' };
    },
  },

  update: {
    preHandler: [validateAuth],
    handler: async ({ request, app }) => {
      const data = await app.container
        .resolve('studiosService')
        .updateStudio(request.params.id, request.body);

      return { data };
    },
  },

  delete: {
    preHandler: [validateAuth],
    handler: async ({ request, app }) => {
      await app.container.resolve('studiosService').deleteStudio(request.params.id);

      return {
        data: { id: request.params.id },
      };
    },
  },
});
