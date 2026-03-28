import {
  IdParamSchema,
  CreatePersonSchema,
  GetPeopleListQuerySchema,
  SearchPersonSchema,
  UpdatePersonInputSchema,
  buildListOptionSchema,
  PeopleListResponseSchema,
  PersonResponseSchema,
} from '@films-collection/shared';
import z from 'zod';
import { defineContracts } from '~/helpers';

export const peopleContract = defineContracts('people', {
  getList: {
    method: 'GET',
    url: '',
    schema: {
      querystring: GetPeopleListQuerySchema,
      response: PeopleListResponseSchema,
    },
  },
  search: {
    method: 'GET',
    url: 'search',
    schema: {
      querystring: SearchPersonSchema,
      response: buildListOptionSchema(z.number()),
    },
  },
  create: {
    method: 'POST',
    url: '',
    schema: {
      body: CreatePersonSchema,
      response: PersonResponseSchema,
    },
  },
  update: {
    method: 'PATCH',
    url: ':id',
    schema: {
      params: IdParamSchema,
      body: UpdatePersonInputSchema,
      response: PersonResponseSchema,
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
