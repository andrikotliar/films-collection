import { defineRoute, createRouter, validateAuth } from '~/shared';
import {
  IdParamSchema,
  CreatePersonSchema,
  GetPeopleListQuerySchema,
  SearchPersonSchema,
  UpdatePersonInputSchema,
  buildListOptionSchema,
} from '@films-collection/shared';
import z from 'zod';

export default createRouter([
  defineRoute({
    method: 'GET',
    url: '/',
    schema: {
      querystring: GetPeopleListQuerySchema,
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
      querystring: SearchPersonSchema,
      response: buildListOptionSchema(z.number()),
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
      body: CreatePersonSchema,
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
      params: IdParamSchema,
      body: UpdatePersonInputSchema,
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
      params: IdParamSchema,
      response: IdParamSchema,
    },
    preHandler: [validateAuth],
    handler: async ({ request, app }) => {
      const data = await app.container.resolve('peopleService').deletePerson(request.params.id);

      return { data: { id: data.id } };
    },
  }),
]);
