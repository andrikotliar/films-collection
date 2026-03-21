import { createRouter, validateAuth } from '~/shared';
import { collectionEventsContract } from '@films-collection/api-client';

export const collectionEventsRouter = createRouter(collectionEventsContract, {
  create: {
    preHandler: [validateAuth],
    handler: async ({ request, app }) => {
      const data = await app.container.resolve('collectionEventsService').createEvent(request.body);

      return { data };
    },
  },

  getAll: {
    preHandler: [validateAuth],
    handler: async ({ app }) => {
      const data = await app.container.resolve('collectionEventsService').getAllEvents();

      return { data };
    },
  },

  delete: {
    preHandler: [validateAuth],
    handler: async ({ request, app }) => {
      await app.container.resolve('collectionEventsService').deleteEvent(request.params.id);

      return { data: { id: request.params.id } };
    },
  },

  update: {
    preHandler: [validateAuth],
    handler: async ({ request, app }) => {
      const data = await app.container
        .resolve('collectionEventsService')
        .updateEvent(request.params.id, request.body);

      return { data };
    },
  },
});
