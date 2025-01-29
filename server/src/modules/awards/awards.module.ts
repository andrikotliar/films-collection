import { FastifyInstance } from 'fastify';
import { AwardsRepository } from './awards.repository';
import { AwardsService } from './awards.service';

export const registerAwardsModule = async (app: FastifyInstance) => {
  const awardRepository = new AwardsRepository(app.database);
  const awardsService = new AwardsService(awardRepository);

  app.decorate('awardsService', awardsService);
};
