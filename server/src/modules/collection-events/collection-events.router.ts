import { FastifyInstance } from 'fastify';
import {
  CollectionEventsCreateSchema,
  CollectionEventsDeleteParamsSchema,
  CollectionEventsUpdateParamsSchema,
  CollectionEventsUpdateBodySchema,
} from 'src/modules/collection-events/schemas';

export const CollectionEventRouter = async (
  collectionEventModule: FastifyInstance,
) => {
  collectionEventModule.route({
    method: 'POST',
    url: '/',
    preHandler: [collectionEventModule.authenticate],
    schema: {
      body: CollectionEventsCreateSchema,
    },
    handler: collectionEventModule.collectionEventsController.createEvent,
  });

  collectionEventModule.route({
    method: 'GET',
    url: '/admin/list',
    preHandler: [collectionEventModule.authenticate],
    handler: collectionEventModule.collectionEventsController.getAllEvents,
  });

  collectionEventModule.route({
    method: 'PATCH',
    url: '/:id',
    preHandler: [collectionEventModule.authenticate],
    schema: {
      params: CollectionEventsUpdateParamsSchema,
      body: CollectionEventsUpdateBodySchema,
    },
    handler: collectionEventModule.collectionEventsController.updateEvent,
  });

  collectionEventModule.route({
    method: 'DELETE',
    url: '/:id',
    preHandler: [collectionEventModule.authenticate],
    schema: {
      params: CollectionEventsDeleteParamsSchema,
    },
    handler: collectionEventModule.collectionEventsController.deleteEvent,
  });
};
