import { defineRoute, createRouter, validateAuth } from '~/shared';
import {
  IdParamSchema,
  CountryInputSchema,
  CountriesListResponseSchema,
  CountryResponseSchema,
} from '@films-collection/shared';

export const countriesRouter = createRouter([
  defineRoute({
    method: 'GET',
    url: '/',
    schema: {
      response: CountriesListResponseSchema,
    },
    handler: async ({ app }) => {
      const data = await app.container.resolve('countriesService').getBaseDataList();

      return { data };
    },
  }),

  defineRoute({
    method: 'POST',
    url: '/',
    schema: { body: CountryInputSchema, response: CountryResponseSchema },
    preHandler: [validateAuth],
    handler: async ({ request, app }) => {
      const data = await app.container.resolve('countriesService').createCountry(request.body);

      return { data };
    },
  }),

  defineRoute({
    method: 'PATCH',
    url: '/:id',
    schema: { body: CountryInputSchema, params: IdParamSchema, response: CountryResponseSchema },
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
    schema: { params: IdParamSchema, response: IdParamSchema },
    preHandler: [validateAuth],
    handler: async ({ request, app }) => {
      await app.container.resolve('countriesService').deleteCountry(request.params.id);

      return {
        data: { id: request.params.id },
      };
    },
  }),
]);
