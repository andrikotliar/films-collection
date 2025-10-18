import { IdParamSchema, defineRoute, useRoutes } from '~/common';
import { CreateCollectionEventSchema, UpdateCollectionEventBodySchema } from './schemas';
import { collectionEvents } from '~/modules/collection-events/collection-events.module';

export const collectionEventsRoutes = useRoutes('collection-events', [
  defineRoute({
    method: 'POST',
    url: '/',
    isPrivate: true,
    successStatus: 'CREATED',
    schema: {
      body: CreateCollectionEventSchema,
    },
    handler: async ({ request }) => {
      const data = await collectionEvents.createEvent(request.body);

      return data;
    },
  }),

  defineRoute({
    method: 'GET',
    url: '/',
    isPrivate: true,
    handler: async () => {
      const data = await collectionEvents.getAllEvents();

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
    handler: async ({ request }) => {
      const data = await collectionEvents.deleteEvent(request.params.id);

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
    handler: async ({ request }) => {
      const data = await collectionEvents.updateEvent(request.params.id, request.body);

      return data;
    },
  }),
]);
