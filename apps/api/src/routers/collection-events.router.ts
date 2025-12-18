import { defineRoute, createRouter, validateAuth } from '~/shared';
import {
  CreateCollectionEventInputSchemaRef,
  UpdateCollectionEventInputSchemaRef,
  IdParamSchemaRef,
} from '@films-collection/shared';

export default createRouter([
  defineRoute({
    method: 'POST',
    url: '/',
    preHandler: [validateAuth],
    schema: {
      body: CreateCollectionEventInputSchemaRef,
    },
    handler: async ({ request, app }) => {
      const data = await app.container.resolve('collectionEventsService').createEvent(request.body);

      return { data };
    },
  }),

  defineRoute({
    method: 'GET',
    url: '/',
    preHandler: [validateAuth],
    handler: async ({ app }) => {
      const data = await app.container.resolve('collectionEventsService').getAllEvents();

      return { data };
    },
  }),

  defineRoute({
    method: 'DELETE',
    url: '/:id',
    preHandler: [validateAuth],
    schema: {
      params: IdParamSchemaRef,
    },
    handler: async ({ request, app }) => {
      const data = await app.container
        .resolve('collectionEventsService')
        .deleteEvent(request.params.id);

      return { data };
    },
  }),

  defineRoute({
    method: 'PATCH',
    url: '/:id',
    preHandler: [validateAuth],
    schema: {
      params: IdParamSchemaRef,
      body: UpdateCollectionEventInputSchemaRef,
    },
    handler: async ({ request, app }) => {
      const data = await app.container
        .resolve('collectionEventsService')
        .updateEvent(request.params.id, request.body);

      return { data };
    },
  }),
]);
