import { IdParamSchema, router } from 'src/common';
import {
  CreateCollectionEventSchema,
  UpdateCollectionEventBodySchema,
} from './schemas';

export const CollectionEventsController = router((app, defineRoute) => [
  defineRoute({
    method: 'POST',
    url: '/',
    preHandler: [app.authenticate],
    schema: {
      body: CreateCollectionEventSchema,
    },
    handler: async ({ request }) => {
      const data = await app.collectionEventsService.createEvent(request.body);

      return {
        status: 'OK',
        data,
      };
    },
  }),

  defineRoute({
    method: 'GET',
    url: '/admin/list',
    preHandler: [app.authenticate],
    handler: async () => {
      const data = await app.collectionEventsService.getAllEvents();

      return {
        status: 'OK',
        data,
      };
    },
  }),

  defineRoute({
    method: 'DELETE',
    url: '/:id',
    preHandler: [app.authenticate],
    schema: {
      params: IdParamSchema,
    },
    handler: async ({ request }) => {
      const data = await app.collectionEventsService.deleteEvent(
        request.params.id,
      );

      return {
        status: 'OK',
        data,
      };
    },
  }),

  defineRoute({
    method: 'PATCH',
    url: '/:id',
    preHandler: [app.authenticate],
    schema: {
      params: IdParamSchema,
      body: UpdateCollectionEventBodySchema,
    },
    handler: async ({ request }) => {
      const data = await app.collectionEventsService.updateEvent(
        request.params.id,
        request.body,
      );

      return {
        status: 'OK',
        data,
      };
    },
  }),
]);
