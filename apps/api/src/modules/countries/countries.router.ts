import { countriesContract } from '@films-collection/api-client';
import { createRouter, validateAuth } from '~/shared';

export const countriesRouter = createRouter(countriesContract, {
  getList: {
    handler: async ({ app }) => {
      const data = await app.container.resolve('countriesService').getBaseDataList();

      return { data };
    },
  },

  create: {
    preHandler: [validateAuth],
    handler: async ({ request, app }) => {
      const data = await app.container.resolve('countriesService').createCountry(request.body);

      return { data };
    },
  },

  update: {
    preHandler: [validateAuth],
    handler: async ({ request, app }) => {
      const data = await app.container
        .resolve('countriesService')
        .updateCountry(request.params.id, request.body);

      return { data };
    },
  },

  delete: {
    preHandler: [validateAuth],
    handler: async ({ request, app }) => {
      await app.container.resolve('countriesService').deleteCountry(request.params.id);

      return {
        data: { id: request.params.id },
      };
    },
  },
});
