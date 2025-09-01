import { IdParamSchema, defineRoute, useRoutes } from 'src/common';
import { ManageCountryBodySchema } from './schemas';
import { countries } from 'src/modules/countries/countries.module';

export const countriesRoutes = useRoutes('countries', [
  defineRoute({
    method: 'GET',
    url: '/',
    handler: async () => {
      const data = await countries.getBaseDataList();

      return data;
    },
  }),

  defineRoute({
    method: 'POST',
    url: '/',
    schema: { body: ManageCountryBodySchema },
    successStatus: 'CREATED',
    isPrivate: true,
    handler: async ({ request }) => {
      const data = await countries.createCountry(request.body);

      return data;
    },
  }),

  defineRoute({
    method: 'PATCH',
    url: '/:id',
    schema: { body: ManageCountryBodySchema, params: IdParamSchema },
    isPrivate: true,
    handler: async ({ request }) => {
      const data = await countries.updateCountry(request.params.id, request.body);

      return data;
    },
  }),

  defineRoute({
    method: 'DELETE',
    url: '/:id',
    schema: { params: IdParamSchema },
    isPrivate: true,
    handler: async ({ request }) => {
      const data = await countries.deleteCountry(request.params.id);

      return {
        id: data.id,
      };
    },
  }),
]);
