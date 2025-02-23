import { FastifyInstance } from 'fastify';
import fastifyPlugin from 'fastify-plugin';
import { CollectionEventsController } from 'src/modules/collection-events/collection-events.controller';
import { CollectionEventsRepository } from 'src/modules/collection-events/collection-events.repository';
import { createCollectionEventRouter } from 'src/modules/collection-events/collection-events.router';
import { CollectionEventsService } from 'src/modules/collection-events/collection-events.service';

export const CollectionEventsModule = fastifyPlugin(
  async (app: FastifyInstance) => {
    const collectionEventsRepository = new CollectionEventsRepository(
      app.database,
    );
    const collectionEventsService = new CollectionEventsService(
      collectionEventsRepository,
    );
    const collectionEventsController = new CollectionEventsController(
      collectionEventsService,
    );

    app.decorate('collectionEventsService', collectionEventsService);

    app.register(createCollectionEventRouter(collectionEventsController), {
      prefix: '/collection-events',
    });
  },
  { name: 'collectionEvents' },
);
