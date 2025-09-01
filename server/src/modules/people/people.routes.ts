import { IdParamSchema, defineRoute, useRoutes } from 'src/common';
import {
  CreatePersonSchema,
  GetListQueriesSchema,
  SearchPersonSchema,
  UpdatePersonBodySchema,
} from './schemas';
import { people } from 'src/modules/people/people.module';

export const peopleRoutes = useRoutes('people', [
  defineRoute({
    method: 'GET',
    url: '/',
    schema: {
      querystring: GetListQueriesSchema,
    },
    isPrivate: true,
    handler: async ({ request }) => {
      const data = await people.getList(request.query);

      return data;
    },
  }),

  defineRoute({
    method: 'GET',
    url: '/search',
    schema: {
      querystring: SearchPersonSchema,
    },
    handler: async ({ request }) => {
      const data = await people.searchPerson(request.query);

      return data;
    },
  }),

  defineRoute({
    method: 'POST',
    url: '/',
    schema: {
      body: CreatePersonSchema,
    },
    isPrivate: true,
    handler: async ({ request }) => {
      const data = await people.createPerson(request.body);

      return data;
    },
  }),

  defineRoute({
    method: 'PATCH',
    url: '/:id',
    schema: {
      params: IdParamSchema,
      body: UpdatePersonBodySchema,
    },
    isPrivate: true,
    handler: async ({ request }) => {
      const data = await people.updatePerson(request.params.id, request.body);

      return data;
    },
  }),

  defineRoute({
    method: 'DELETE',
    url: '/:id',
    schema: {
      params: IdParamSchema,
    },
    isPrivate: true,
    handler: async ({ request }) => {
      const data = await people.deletePerson(request.params.id);

      return { id: data.id };
    },
  }),
]);
