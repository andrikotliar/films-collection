import { contracts } from '@films-collection/api-client';
import { createRouter } from '~/shared/helpers/create-router.js';
import { validateAuth } from '~/shared/pre-handlers/validate-auth.js';

export const countriesRouter = createRouter(contracts.countries, {
  getList: {
    preHandler: [validateAuth],
    handler: async ({ app, request }) => {
      const service = app.service('CountriesService');
      const data = await app.service('countriesService').getBaseDataList(request.query);

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
