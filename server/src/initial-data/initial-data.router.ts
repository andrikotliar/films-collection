import { FastifyInstance } from 'fastify';
import { InitialDataService } from './initial-data.service';
import { CollectionsService } from 'src/collections/collections.service';
import { CollectionModel } from 'src/collections/collections.model';
import { ListsService } from 'src/lists/lists.service';
import { ListsModel } from 'src/lists/lists.model';
import { InitialDataController } from './initial-data.controller';
import { request } from 'http';

const registerInitialDataRouter = (app: FastifyInstance) => {
  const collectionsService = new CollectionsService(CollectionModel);
  const listsService = new ListsService(ListsModel);

  const initialDataService = new InitialDataService({
    collectionsService,
    listsService,
  });

  const initialDataController = new InitialDataController(initialDataService);

  app.route({
    method: 'GET',
    url: '/initial-data',
    handler: (request, reply) => {
      return initialDataController.getConfig(request, reply);
    },
  });
};

export { registerInitialDataRouter };
