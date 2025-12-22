import { defineRoute, createRouter, validateAuth } from '~/shared';
import { IdParamSchema, CountryInputSchema } from '@films-collection/shared';

export default createRouter([
  defineRoute({
    method: 'GET',
    url: '/',
    handler: async ({ app }) => {
      const data = await app.container.resolve('countriesService').getBaseDataList();

      return { data };
    },
  }),

  defineRoute({
    method: 'POST',
    url: '/',
    schema: { body: CountryInputSchema },
    preHandler: [validateAuth],
    handler: async ({ request, app }) => {
      const data = await app.container.resolve('countriesService').createCountry(request.body);

      return { data };
    },
  }),

  defineRoute({
    method: 'PATCH',
    url: '/:id',
    schema: { body: CountryInputSchema, params: IdParamSchema },
    preHandler: [validateAuth],
    handler: async ({ request, app }) => {
      const data = await app.container
        .resolve('countriesService')
        .updateCountry(request.params.id, request.body);

      return { data };
    },
  }),

  defineRoute({
    method: 'DELETE',
    url: '/:id',
    schema: { params: IdParamSchema },
    preHandler: [validateAuth],
    handler: async ({ request, app }) => {
      const data = await app.container.resolve('countriesService').deleteCountry(request.params.id);

      return {
        data: { id: data.id },
      };
    },
  }),
]);
