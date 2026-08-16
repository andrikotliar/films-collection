import { contracts } from '@films-collection/api-client';
import { createRouter, validateAuth } from '~/shared/index.js';

export const hobbiesRouter = createRouter(contracts.hobbies, {
  getHobbiesList: {
    handler: async () => {
      return {
        data: [],
      };
    },
  },
  getHobby: {
    handler: async () => {
      return {
        data: {} as any,
      };
    },
  },
  createHobby: {
    preHandler: [validateAuth],
    handler: async ({ request, app }) => {
      const data = await app.container.resolve('hobbiesService').create(request.body);

      return {
        data,
      };
    },
  },
  updateHobby: {
    preHandler: [validateAuth],
    handler: async () => {
      return {
        data: {} as any,
      };
    },
  },
  deleteHobby: {
    preHandler: [validateAuth],
    handler: async ({ request }) => {
      return {
        data: { id: request.params.id },
      };
    },
  },
});
