import {
  IdParamSchema,
  CountryInputSchema,
  CountriesListResponseSchema,
  CountryResponseSchema,
} from '@films-collection/shared';
import { defineContracts } from '~/helpers';

export const countriesContract = defineContracts('countries', {
  getList: {
    method: 'GET',
    url: '',
    schema: {
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
