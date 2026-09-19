import {
  IdParamSchema,
  CreatePersonSchema,
  GetPeopleListQuerySchema,
  SearchPersonSchema,
  UpdatePersonInputSchema,
  buildListOptionSchema,
  PeopleListResponseSchema,
  PersonResponseSchema,
} from '@hobbies-collection/shared';
import { z } from 'zod';
import { createContract } from '../helpers/index.js';

export const peopleContract = {
  getList: createContract({
    method: 'GET',
    url: '/people',
    schema: {
      querystring: GetPeopleListQuerySchema,
      response: PeopleListResponseSchema,
    },
  }),
  search: createContract({
    method: 'GET',
    url: '/people/search',
    schema: {
      querystring: SearchPersonSchema,
      response: buildListOptionSchema(z.number()),
    },
  }),
  create: createContract({
    method: 'POST',
    url: '/people',
    schema: {
      body: CreatePersonSchema,
      response: PersonResponseSchema,
    },
  }),
  update: createContract({
    method: 'PATCH',
    url: '/people/:id',
    schema: {
      params: IdParamSchema,
      body: UpdatePersonInputSchema,
      response: PersonResponseSchema,
    },
  }),
  delete: createContract({
    method: 'DELETE',
    url: '/people/:id',
    schema: {
      params: IdParamSchema,
      response: IdParamSchema,
    },
  }),
};
