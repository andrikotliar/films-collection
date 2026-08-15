import {
  IdParamSchema,
  CountryInputSchema,
  CountriesListResponseSchema,
  CountryResponseSchema,
  CommonListQuerySchema,
} from '@films-collection/shared';
import { createContract } from '~/helpers/index.js';

export const countriesContract = {
  getList: createContract({
    method: 'GET',
    url: '',
    schema: {
      querystring: CommonListQuerySchema,
      response: CountriesListResponseSchema,
    },
  }),
  create: createContract({
    method: 'POST',
    url: '',
    schema: {
      body: CountryInputSchema,
      response: CountryResponseSchema,
    },
  }),
  update: createContract({
    method: 'PATCH',
    url: ':id',
    schema: {
      params: IdParamSchema,
      body: CountryInputSchema,
      response: CountryResponseSchema,
    },
  }),
  delete: createContract({
    method: 'DELETE',
    url: ':id',
    schema: {
      params: IdParamSchema,
      response: IdParamSchema,
    },
  }),
};
