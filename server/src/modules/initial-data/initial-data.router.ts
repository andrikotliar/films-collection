import { FastifyInstance } from 'fastify';
import { InitialDataController } from './initial-data.controller';

export const createInitialDataRouter = (
  initialDataController: InitialDataController,
) => {
  return async (initialDataModule: FastifyInstance) => {
    initialDataModule.route({
      method: 'GET',
      url: '/',
      handler: initialDataController.getConfig.bind(initialDataController),
    });
  };
};
