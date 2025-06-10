import { IdParamSchema, router } from 'src/common';
import {
  CreatePersonSchema,
  GetListQueriesSchema,
  SearchPersonSchema,
  UpdatePersonBodySchema,
} from './schemas';

export const PeopleController = router((app, defineRoute) => [
  defineRoute({
    method: 'GET',
    url: '/',
    schema: {
      querystring: GetListQueriesSchema,
    },
    preHandler: [app.authenticate],
    handler: async ({ request }) => {
      const data = await app.peopleService.getList(request.query);

      return {
        status: 'OK',
        data,
      };
    },
  }),

  defineRoute({
    method: 'GET',
    url: '/search',
    schema: {
      querystring: SearchPersonSchema,
    },
    handler: async ({ request }) => {
      const data = await app.peopleService.searchPerson(request.query);

      return {
        status: 'OK',
        data,
      };
    },
  }),

  defineRoute({
    method: 'POST',
    url: '/',
    schema: {
      body: CreatePersonSchema,
    },
    preHandler: [app.authenticate],
    handler: async ({ request }) => {
      const data = await app.peopleService.createPerson(request.body);

      return {
        status: 'OK',
        data,
      };
    },
  }),

  defineRoute({
    method: 'PATCH',
    url: '/:id',
    schema: {
      params: IdParamSchema,
      body: UpdatePersonBodySchema,
    },
    preHandler: [app.authenticate],
    handler: async ({ request }) => {
      const data = await app.peopleService.updatePerson(
        request.params.id,
        request.body,
      );

      return {
        status: 'OK',
        data,
      };
    },
  }),

  defineRoute({
    method: 'DELETE',
    url: '/:id',
    schema: {
      params: IdParamSchema,
    },
    preHandler: [app.authenticate],
    handler: async ({ request }) => {
      const data = await app.peopleService.deletePerson(request.params.id);

      return {
        status: 'OK',
        data: { id: data.id },
      };
    },
  }),
]);
