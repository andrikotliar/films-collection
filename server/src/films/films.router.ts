import { FastifyInstance } from 'fastify';
import { FilmsController } from './films.controller.js';
import { findAllSchema } from './common/index.js';

const registerFilmsRouter = (app: FastifyInstance) => {
  const filmsController = new FilmsController();

  app.route({
    method: 'GET',
    url: '/films',
    handler: filmsController.findAll,
    schema: findAllSchema,
  });

  app.route({
    method: 'GET',
    url: '/films/anniversaries',
    handler: filmsController.findAnniversaries,
  });

  app.route({
    method: 'GET',
    url: '/films/random',
    handler: filmsController.findRandomFilms,
  });

  app.route({
    method: 'GET',
    url: '/films/:id',
    handler: filmsController.findOne,
  });
};

export { registerFilmsRouter };
