import { contracts } from '@films-collection/api-client';
import { createRouter } from '~/shared/helpers/create-router.js';
import { validateAuth } from '~/shared/pre-handlers/validate-auth.js';

export const awardsRouter = createRouter(contracts.awards, {
  getList: {
    preHandler: [validateAuth],
    handler: async ({ request, services: { AwardsService } }) => {
      const data = await AwardsService.getBaseDataList(request.query);

      return { data };
    },
  },

  create: {
    preHandler: [validateAuth],
    handler: async ({ request, services: { AwardsService } }) => {
      const data = await AwardsService.createAward(request.body);

      return { data, status: 'CREATED' };
    },
  },

  createNomination: {
    preHandler: [validateAuth],
    handler: async ({ request, services: { AwardsService } }) => {
      const data = await AwardsService.createNomination(request.params.id, request.body);

      return { data, status: 'CREATED' };
    },
  },

  getNominations: {
    async handler({ request, services: { AwardsService } }) {
      if (!request.params.id) {
        return { data: [] };
      }

      const data = await AwardsService.getNominationsListOptions(request.params.id);

      return { data };
    },
  },

  getById: {
    async handler({ request, services: { AwardsService } }) {
      const data = await AwardsService.getAwardById(request.params.id);

      return { data };
    },
  },

  update: {
    preHandler: [validateAuth],
    handler: async ({ request, services: { AwardsService } }) => {
      const data = await AwardsService.updateAward(request.params.id, request.body);

      return { data };
    },
  },

  delete: {
    preHandler: [validateAuth],
    handler: async ({ request, services: { AwardsService } }) => {
      await AwardsService.deleteAward(request.params.id);

      return {
        data: {
          id: request.params.id,
        },
      };
    },
  },
});
