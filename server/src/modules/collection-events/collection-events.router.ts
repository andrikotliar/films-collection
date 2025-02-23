import { RouterCreator } from 'src/common';
import { CollectionEventsController } from 'src/modules/collection-events/collection-events.controller';
import {
  collectionEventsCreateSchema,
  collectionEventsDeleteSchema,
  collectionEventsUpdateSchema,
} from 'src/modules/collection-events/schemas';

export const createCollectionEventRouter: RouterCreator<
  CollectionEventsController
> = (controller) => {
  return async (collectionEventModule) => {
    collectionEventModule.route({
      method: 'POST',
      url: '/',
      preHandler: [collectionEventModule.authenticate],
      schema: collectionEventsCreateSchema,
      handler: controller.createEvent.bind(controller),
    });

    collectionEventModule.route({
      method: 'GET',
      url: '/admin/list',
      preHandler: [collectionEventModule.authenticate],
      handler: controller.getAllEvents.bind(controller),
    });

    collectionEventModule.route({
      method: 'PATCH',
      url: '/:id',
      preHandler: [collectionEventModule.authenticate],
      schema: collectionEventsUpdateSchema,
      handler: controller.updateEvent.bind(controller),
    });

    collectionEventModule.route({
      method: 'DELETE',
      url: '/:id',
      preHandler: [collectionEventModule.authenticate],
      schema: collectionEventsDeleteSchema,
      handler: controller.deleteEvent.bind(controller),
    });
  };
};
