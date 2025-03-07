import { FastifyInstance } from 'fastify';
import { CollectionsRepository } from './collections.repository';
import { CollectionsService } from './collections.service';
import fastifyPlugin from 'fastify-plugin';

export const CollectionsModule = fastifyPlugin(
  async (app: FastifyInstance) => {
    const collectionsRepository = new CollectionsRepository(app.database);
    const collectionsService = new CollectionsService(collectionsRepository);

    app.decorate('collectionsService', collectionsService);
  },
  { name: 'collectionsModule' },
);
