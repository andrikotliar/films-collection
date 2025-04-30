import { FastifyInstance } from 'fastify';
import fastifyPlugin from 'fastify-plugin';
import { AwardsRepository } from './awards.repository';
import { AwardsService } from './awards.service';
import { AwardsController } from './awards.controller';
import { AwardsRouter } from './awards.router';

export const AwardsModule = fastifyPlugin(
  async (app: FastifyInstance) => {
    const awardRepository = new AwardsRepository(app.database);
    const awardsService = new AwardsService(awardRepository);

    app.decorate('awardsService', awardsService);
    app.decorate('awardsController', new AwardsController());

    app.register(AwardsRouter, { prefix: '/awards' });
  },
  { name: 'awardsModule' },
);
