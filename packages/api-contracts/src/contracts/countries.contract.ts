import {
  IdParamSchema,
  CountryInputSchema,
  CountriesListResponseSchema,
  CountryResponseSchema,
  CommonListQuerySchema,
} from '@hobbies-collection/shared';
import { createContract } from '../helpers/index.js';

export const countriesContract = {
  getList: createContract({
    method: 'GET',
    url: '/countries',
    schema: {
      querystring: CommonListQuerySchema,
      response: CountriesListResponseSchema,
    },
  }),
  create: createContract({
    method: 'POST',
    url: '/countries',
    schema: {
      body: CountryInputSchema,
      response: CountryResponseSchema,
    },
  }),
  update: createContract({
    method: 'PATCH',
    url: '/countries/:id',
    schema: {
      params: IdParamSchema,
      body: CountryInputSchema,
      response: CountryResponseSchema,
    },
  }),
  delete: createContract({
    method: 'DELETE',
    url: '/countries/:id',
    schema: {
      params: IdParamSchema,
      response: IdParamSchema,
    },
  }),
};
