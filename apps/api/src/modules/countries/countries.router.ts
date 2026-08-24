import { contracts } from '@films-collection/api-client';
import { createRouter } from '~/shared/helpers/create-router.js';
import { validateAuth } from '~/shared/pre-handlers/validate-auth.js';

export const countriesRouter = createRouter(contracts.countries, {
  getList: {
    preHandler: [validateAuth],
    handler: async ({ services: { CountriesService }, request }) => {
      const data = await CountriesService.getBaseDataList(request.query);

      return { data };
    },
  },

  create: {
    preHandler: [validateAuth],
    handler: async ({ request, services: { CountriesService } }) => {
      const data = await CountriesService.createCountry(request.body);

      return { data };
    },
  },

  update: {
    preHandler: [validateAuth],
    handler: async ({ request, services: { CountriesService } }) => {
      const data = await CountriesService.updateCountry(request.params.id, request.body);

      return { data };
    },
  },

  delete: {
    preHandler: [validateAuth],
    handler: async ({ request, services: { CountriesService } }) => {
      await CountriesService.deleteCountry(request.params.id);

      return {
        data: { id: request.params.id },
      };
    },
  },
});
