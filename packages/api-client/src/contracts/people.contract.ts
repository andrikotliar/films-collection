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
import { z } from 'zod';
import { createContract } from '~/helpers/index.js';

export const peopleContract = {
  getList: createContract({
    method: 'GET',
    url: '',
    schema: {
      querystring: GetPeopleListQuerySchema,
      response: PeopleListResponseSchema,
    },
  }),
  search: createContract({
    method: 'GET',
    url: 'search',
    schema: {
      querystring: SearchPersonSchema,
      response: buildListOptionSchema(z.number()),
    },
  }),
  create: createContract({
    method: 'POST',
    url: '',
    schema: {
      body: CreatePersonSchema,
      response: PersonResponseSchema,
    },
  }),
  update: createContract({
    method: 'PATCH',
    url: ':id',
    schema: {
      params: IdParamSchema,
      body: UpdatePersonInputSchema,
      response: PersonResponseSchema,
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
