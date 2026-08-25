import { contracts } from '@films-collection/api-client';
import { createRouter } from '~/shared/helpers/create-router.js';
import { validateAuth } from '~/shared/pre-handlers/validate-auth.js';

export const hobbiesRouter = createRouter(contracts.hobbies, {
  getHobbiesList: {
    handler: async ({ app }) => {
      const data = await app.resolve('hobbiesService').getHobbiesList();
      return {
        data,
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
      const data = await app.resolve('hobbiesService').create(request.body);

      return {
        data,
      };
    },
  },
  updateHobby: {
    preHandler: [validateAuth],
    handler: async ({ app, request }) => {
      const data = await app.resolve('hobbiesService').update(request.params.id, request.body);

      return {
        data,
      };
    },
  },
  deleteHobby: {
    preHandler: [validateAuth],
    handler: async ({ request, app }) => {
      await app.resolve('hobbiesService').delete(request.params.id);
      return {
        data: { id: request.params.id },
      };
    },
  },
});
