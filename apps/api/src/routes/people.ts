import { IdParamSchema, defineRoute, useRoutes } from '~/lib';
import {
  CreatePersonSchema,
  GetListQueriesSchema,
  SearchPersonSchema,
  UpdatePersonBodySchema,
} from '~/services/people';

export const peopleRoutes = useRoutes('people', [
  defineRoute({
    method: 'GET',
    url: '/',
    schema: {
      querystring: GetListQueriesSchema,
    },
    isPrivate: true,
    handler: async ({ request, app }) => {
      const data = await app.container.resolve('peopleService').getList(request.query);

      return data;
    },
  }),

  defineRoute({
    method: 'GET',
    url: '/search',
    schema: {
      querystring: SearchPersonSchema,
    },
    handler: async ({ request, app }) => {
      const data = await app.container.resolve('peopleService').searchPerson(request.query);

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
    handler: async ({ request, app }) => {
      const data = await app.container.resolve('peopleService').createPerson(request.body);

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
    handler: async ({ request, app }) => {
      const data = await app.container
        .resolve('peopleService')
        .updatePerson(request.params.id, request.body);

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
    handler: async ({ request, app }) => {
      const data = await app.container.resolve('peopleService').deletePerson(request.params.id);

      return { id: data.id };
    },
  }),
]);
