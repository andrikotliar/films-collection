import { FastifyInstance } from 'fastify';
import { InitialDataService } from './initial-data.service';
import { InitialDataController } from './initial-data.controller';
import { createInitialDataRouter } from './initial-data.router';

export const InitialDataModule = async (app: FastifyInstance) => {
  const initialDataService = new InitialDataService({
    collectionsService: app.collectionsService,
    genresService: app.genresService,
    countriesService: app.countriesService,
    studiosService: app.studiosService,
  });

  const initialDataController = new InitialDataController(initialDataService);

  app.register(createInitialDataRouter(initialDataController), {
    prefix: '/initial-data',
  });
};
