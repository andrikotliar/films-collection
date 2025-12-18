import { defineRoute, createRouter, validateAuth } from '~/shared';
import {
  IdParamSchemaRef,
  CreatePersonSchemaRef,
  GetPeopleListQuerySchemaRef,
  SearchPersonSchemaRef,
  UpdatePersonInputSchemaRef,
} from '@films-collection/shared';

export default createRouter([
  defineRoute({
    method: 'GET',
    url: '/',
    schema: {
      querystring: GetPeopleListQuerySchemaRef,
    },
    preHandler: [validateAuth],
    handler: async ({ request, app }) => {
      const data = await app.container.resolve('peopleService').getList(request.query);

      return { data };
    },
  }),

  defineRoute({
    method: 'GET',
    url: '/search',
    schema: {
      querystring: SearchPersonSchemaRef,
    },
    handler: async ({ request, app }) => {
      const data = await app.container.resolve('peopleService').searchPerson(request.query);

      return { data };
    },
  }),

  defineRoute({
    method: 'POST',
    url: '/',
    schema: {
      body: CreatePersonSchemaRef,
    },
    preHandler: [validateAuth],
    handler: async ({ request, app }) => {
      const data = await app.container.resolve('peopleService').createPerson(request.body);

      return { data };
    },
  }),

  defineRoute({
    method: 'PATCH',
    url: '/:id',
    schema: {
      params: IdParamSchemaRef,
      body: UpdatePersonInputSchemaRef,
    },
    preHandler: [validateAuth],
    handler: async ({ request, app }) => {
      const data = await app.container
        .resolve('peopleService')
        .updatePerson(request.params.id, request.body);

      return { data };
    },
  }),

  defineRoute({
    method: 'DELETE',
    url: '/:id',
    schema: {
      params: IdParamSchemaRef,
    },
    preHandler: [validateAuth],
    handler: async ({ request, app }) => {
      const data = await app.container.resolve('peopleService').deletePerson(request.params.id);

      return { data: { id: data.id } };
    },
  }),
]);
