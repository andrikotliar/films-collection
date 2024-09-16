import { FastifyInstance } from 'fastify';
import { FilmsController } from './films.controller.js';
import { findAllSchema } from './validation/find-all-schema.js';

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
