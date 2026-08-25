import { contracts } from '@films-collection/api-client';
import { createRouter } from '~/shared/helpers/create-router.js';
import { validateAuth } from '~/shared/pre-handlers/validate-auth.js';

export const peopleRouter = createRouter(contracts.people, {
  getList: {
    preHandler: [validateAuth],
    handler: async ({ request, app }) => {
      const data = await app.resolve('peopleService').getList(request.query);

      return { data };
    },
  },

  search: {
    handler: async ({ request, app }) => {
      const data = await app.resolve('peopleService').searchPerson(request.query);

      return { data };
    },
  },

  create: {
    preHandler: [validateAuth],
    handler: async ({ request, app }) => {
      const data = await app.resolve('peopleService').createPerson(request.body);

      return { data };
    },
  },

  update: {
    preHandler: [validateAuth],
    handler: async ({ request, app }) => {
      const data = await app.resolve('peopleService').updatePerson(request.params.id, request.body);

      return { data };
    },
  },

  delete: {
    preHandler: [validateAuth],
    handler: async ({ request, app }) => {
      await app.resolve('peopleService').deletePerson(request.params.id);

      return { data: { id: request.params.id } };
    },
  },
});
