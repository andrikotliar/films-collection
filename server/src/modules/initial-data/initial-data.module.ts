import { FastifyInstance } from 'fastify';
import fastifyPlugin from 'fastify-plugin';
import { InitialDataService } from './initial-data.service';
import { InitialDataController } from './initial-data.controller';
import { InitialDataRouter } from './initial-data.router';

export const InitialDataModule = fastifyPlugin(
  async (app: FastifyInstance) => {
    app.decorate(
      'initialDataService',
      new InitialDataService({
        collectionsService: app.collectionsService,
        genresService: app.genresService,
        countriesService: app.countriesService,
        studiosService: app.studiosService,
        collectionEventsService: app.collectionEventsService,
        awardsService: app.awardsService,
      }),
    );

    app.decorate('initialDataController', new InitialDataController());

    app.register(InitialDataRouter, {
      prefix: '/initial-data',
    });
  },
  { name: 'initialDataModule' },
);
