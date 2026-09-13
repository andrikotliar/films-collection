import { contracts } from '@films-collection/contracts';
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
    handler: async ({ app, request }) => {
      const data = await app.resolve('hobbiesService').getHobby(request.params.id, request.query);
      return {
        data,
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
  deleteHobbyItem: {
    preHandler: [validateAuth],
    handler: async ({ request, app }) => {
      await app.resolve('hobbiesService').deleteItem(request.params.itemId);
      return {
        data: { id: request.params.id },
      };
    },
  },
  createHobbyItem: {
    preHandler: [validateAuth],
    handler: async ({ request, app }) => {
      const data = await app
        .resolve('hobbiesService')
        .createHobbyItem(request.body, request.params.id);
      return { data };
    },
  },
  getHobbiesByCollection: {
    preHandler: [validateAuth],
    handler: async ({ request, app }) => {
      const data = await app.resolve('hobbiesService').getItemsByCollection(request.params.id);

      return { data };
    },
  },
  updateHobbyItem: {
    preHandler: [validateAuth],
    handler: async ({ request, app }) => {
      const data = await app
        .resolve('hobbiesService')
        .updateHobbyItem(request.params.itemId, request.body);

      return { data };
    },
  },
  getHobbyAdmin: {
    preHandler: [validateAuth],
    handler: async ({ request, app }) => {
      const data = await app.resolve('hobbiesService').getAdminHobby(request.params.id);

      return { data };
    },
  },
});
