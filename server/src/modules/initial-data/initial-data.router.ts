import { FastifyInstance } from 'fastify';

export const InitialDataRouter = async (initialDataModule: FastifyInstance) => {
  initialDataModule.route({
    method: 'GET',
    url: '/',
    handler: initialDataModule.initialDataController.getConfig,
  });
};
