import { IdParamSchema, defineRoute, useRoutes } from '~/common';
import { ManageCountryBodySchema } from '~/services/countries';

export const countriesRoutes = useRoutes('countries', [
  defineRoute({
    method: 'GET',
    url: '/',
    handler: async ({ app }) => {
      const data = await app.container.resolve('countriesService').getBaseDataList();

      return data;
    },
  }),

  defineRoute({
    method: 'POST',
    url: '/',
    schema: { body: ManageCountryBodySchema },
    successStatus: 'CREATED',
    isPrivate: true,
    handler: async ({ request, app }) => {
      const data = await app.container.resolve('countriesService').createCountry(request.body);

      return data;
    },
  }),

  defineRoute({
    method: 'PATCH',
    url: '/:id',
    schema: { body: ManageCountryBodySchema, params: IdParamSchema },
    isPrivate: true,
    handler: async ({ request, app }) => {
      const data = await app.container
        .resolve('countriesService')
        .updateCountry(request.params.id, request.body);

      return data;
    },
  }),

  defineRoute({
    method: 'DELETE',
    url: '/:id',
    schema: { params: IdParamSchema },
    isPrivate: true,
    handler: async ({ request, app }) => {
      const data = await app.container.resolve('countriesService').deleteCountry(request.params.id);

      return {
        id: data.id,
      };
    },
  }),
]);
