import { IdParamSchema, defineRoute, useRoutes } from '~/common';
import {
  CreateCollectionEventSchema,
  UpdateCollectionEventBodySchema,
} from '~/services/collection-events';

export const collectionEventsRoutes = useRoutes('collection-events', [
  defineRoute({
    method: 'POST',
    url: '/',
    isPrivate: true,
    successStatus: 'CREATED',
    schema: {
      body: CreateCollectionEventSchema,
    },
    handler: async ({ request, app }) => {
      const data = await app.container.resolve('collectionEventsService').createEvent(request.body);

      return data;
    },
  }),

  defineRoute({
    method: 'GET',
    url: '/',
    isPrivate: true,
    handler: async ({ app }) => {
      const data = await app.container.resolve('collectionEventsService').getAllEvents();

      return data;
    },
  }),

  defineRoute({
    method: 'DELETE',
    url: '/:id',
    isPrivate: true,
    schema: {
      params: IdParamSchema,
    },
    handler: async ({ request, app }) => {
      const data = await app.container
        .resolve('collectionEventsService')
        .deleteEvent(request.params.id);

      return data;
    },
  }),

  defineRoute({
    method: 'PATCH',
    url: '/:id',
    isPrivate: true,
    schema: {
      params: IdParamSchema,
      body: UpdateCollectionEventBodySchema,
    },
    handler: async ({ request, app }) => {
      const data = await app.container
        .resolve('collectionEventsService')
        .updateEvent(request.params.id, request.body);

      return data;
    },
  }),
]);
