import { FastifyInstance } from 'fastify';
import { FilmsController } from './films.controller';
import { findAllSchema } from './common';

const registerFilmsRouter = (app: FastifyInstance) => {
  const filmsController = new FilmsController();

  app.route({
    method: 'GET',
    url: '/films',
    handler: filmsController.findAll,
    schema: findAllSchema,
  });
};

export { registerFilmsRouter };
