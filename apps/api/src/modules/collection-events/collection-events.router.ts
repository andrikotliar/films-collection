import { defineRoute, createRouter, validateAuth } from '~/shared';
import {
  CreateCollectionEventInputSchema,
  UpdateCollectionEventInputSchema,
  IdParamSchema,
  CollectionEventResponseSchema,
  CollectionEventsListResponseSchema,
} from '@films-collection/shared';

export const collectionEventsRouter = createRouter([
  defineRoute({
    method: 'POST',
    url: '/',
    preHandler: [validateAuth],
    schema: {
      body: CreateCollectionEventInputSchema,
      response: CollectionEventResponseSchema,
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
    schema: {
      response: CollectionEventsListResponseSchema,
    },
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
      params: IdParamSchema,
      response: IdParamSchema,
    },
    handler: async ({ request, app }) => {
      await app.container.resolve('collectionEventsService').deleteEvent(request.params.id);

      return { data: { id: request.params.id } };
    },
  }),

  defineRoute({
    method: 'PATCH',
    url: '/:id',
    preHandler: [validateAuth],
    schema: {
      params: IdParamSchema,
      body: UpdateCollectionEventInputSchema,
      response: CollectionEventResponseSchema,
    },
    handler: async ({ request, app }) => {
      const data = await app.container
        .resolve('collectionEventsService')
        .updateEvent(request.params.id, request.body);

      return { data };
    },
  }),
]);
