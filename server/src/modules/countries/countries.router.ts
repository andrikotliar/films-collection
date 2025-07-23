import { IdParamSchema, createRouter } from 'src/common';
import { ManageCountryBodySchema } from './schemas';

export const createCountriesRouter = createRouter((app, defineRoute) => [
  defineRoute({
    method: 'GET',
    url: '/',
    handler: async () => {
      const data = await app.countriesService.getBaseDataList();

      return {
        status: 'OK',
        data,
      };
    },
  }),

  defineRoute({
    method: 'POST',
    url: '/',
    schema: { body: ManageCountryBodySchema },
    preHandler: [app.authenticate],
    handler: async ({ request }) => {
      const data = await app.countriesService.createCountry(request.body);

      return {
        status: 'CREATED',
        data,
      };
    },
  }),

  defineRoute({
    method: 'PATCH',
    url: '/:id',
    schema: { body: ManageCountryBodySchema, params: IdParamSchema },
    preHandler: [app.authenticate],
    handler: async ({ request }) => {
      const data = await app.countriesService.updateCountry(request.params.id, request.body);

      return {
        status: 'OK',
        data,
      };
    },
  }),

  defineRoute({
    method: 'DELETE',
    url: '/:id',
    schema: { params: IdParamSchema },
    preHandler: [app.authenticate],
    handler: async ({ request }) => {
      const data = await app.countriesService.deleteCountry(request.params.id);

      return {
        status: 'OK',
        data: {
          id: data.id,
        },
      };
    },
  }),
]);
