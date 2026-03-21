import { createRouter, validateAuth } from '~/shared';
import { awardsContract } from '@films-collection/api-client';

export const awardsRouter = createRouter(awardsContract, {
  getList: {
    handler: async ({ app }) => {
      const data = await app.container.resolve('awardsService').getBaseDataList();

      return { data };
    },
  },

  create: {
    preHandler: [validateAuth],
    handler: async ({ request, app }) => {
      const data = await app.container.resolve('awardsService').createAward(request.body);

      return { data, status: 'CREATED' };
    },
  },

  createNomination: {
    preHandler: [validateAuth],
    handler: async ({ request, app }) => {
      const data = await app.container
        .resolve('awardsService')
        .createNomination(request.params.id, request.body);

      return { data, status: 'CREATED' };
    },
  },

  getNominations: {
    async handler({ request, app }) {
      if (!request.params.id) {
        return { data: [] };
      }

      const data = await app.container
        .resolve('awardsService')
        .getNominationsListOptions(request.params.id);

      return { data };
    },
  },

  getById: {
    async handler({ request, app }) {
      const data = await app.container.resolve('awardsService').getAwardById(request.params.id);

      return { data };
    },
  },

  update: {
    preHandler: [validateAuth],
    handler: async ({ request, app }) => {
      const data = await app.container
        .resolve('awardsService')
        .updateAward(request.params.id, request.body);

      return { data };
    },
  },

  delete: {
    preHandler: [validateAuth],
    handler: async ({ request, app }) => {
      await app.container.resolve('awardsService').deleteAward(request.params.id);

      return {
        data: {
          id: request.params.id,
        },
      };
    },
  },
});
