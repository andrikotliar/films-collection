import { FastifyInstance } from 'fastify';
import { CollectionsRepository } from './collections.repository';
import { CollectionsService } from './collections.service';

export const CollectionsModule = async (app: FastifyInstance) => {
  const collectionsRepository = new CollectionsRepository(app.database);
  const collectionsService = new CollectionsService(collectionsRepository);

  app.decorate('collectionsService', collectionsService);
};
