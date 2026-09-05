import { contracts } from '@films-collection/contracts';
import { createRouter } from '~/shared/helpers/create-router.js';
import { validateAuth } from '~/shared/pre-handlers/validate-auth.js';

export const awardsRouter = createRouter(contracts.awards, {
  getList: {
    preHandler: [validateAuth],
    handler: async ({ request, app }) => {
      const data = await app.resolve('awardsService').getBaseDataList(request.query);

      return { data };
    },
  },

  create: {
    preHandler: [validateAuth],
    handler: async ({ request, app }) => {
      const data = await app.resolve('awardsService').createAward(request.body);

      return { data, status: 'CREATED' };
    },
  },

  createNomination: {
    preHandler: [validateAuth],
    handler: async ({ request, app }) => {
      const data = await app
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

      const data = await app.resolve('awardsService').getNominationsListOptions(request.params.id);

      return { data };
    },
  },

  getById: {
    async handler({ request, app }) {
      const data = await app.resolve('awardsService').getAwardById(request.params.id);

      return { data };
    },
  },

  update: {
    preHandler: [validateAuth],
    handler: async ({ request, app }) => {
      const data = await app.resolve('awardsService').updateAward(request.params.id, request.body);

      return { data };
    },
  },

  delete: {
    preHandler: [validateAuth],
    handler: async ({ request, app }) => {
      await app.resolve('awardsService').deleteAward(request.params.id);

      return {
        data: {
          id: request.params.id,
        },
      };
    },
  },
});
