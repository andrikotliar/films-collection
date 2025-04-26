import { FastifyInstance } from 'fastify';
import fastifyPlugin from 'fastify-plugin';
import { CollectionEventsController } from './collection-events.controller';
import { CollectionEventsRepository } from './collection-events.repository';
import { CollectionEventRouter } from './collection-events.router';
import { CollectionEventsService } from './collection-events.service';

export const CollectionEventsModule = fastifyPlugin(
  async (app: FastifyInstance) => {
    const collectionEventsRepository = new CollectionEventsRepository(
      app.database,
    );

    app.decorate(
      'collectionEventsService',
      new CollectionEventsService(collectionEventsRepository, app.filesService),
    );

    app.decorate(
      'collectionEventsController',
      new CollectionEventsController(),
    );

    app.register(CollectionEventRouter, {
      prefix: '/collection-events',
    });
  },
  { name: 'collectionEvents' },
);
