import {
  IdParamSchema,
  CountryInputSchema,
  CountriesListResponseSchema,
  CountryResponseSchema,
  CommonListQuerySchema,
} from '@films-collection/shared';
import { defineContracts } from '~/helpers/index.js';

export const countriesContract = defineContracts('countries', {
  getList: {
    method: 'GET',
    url: '',
    schema: {
      querystring: CommonListQuerySchema,
      response: CountriesListResponseSchema,
    },
  },
  create: {
    method: 'POST',
    url: '',
    schema: {
      body: CountryInputSchema,
      response: CountryResponseSchema,
    },
  },
  update: {
    method: 'PATCH',
    url: ':id',
    schema: {
      params: IdParamSchema,
      body: CountryInputSchema,
      response: CountryResponseSchema,
    },
  },
  delete: {
    method: 'DELETE',
    url: ':id',
    schema: {
      params: IdParamSchema,
      response: IdParamSchema,
    },
  },
});
