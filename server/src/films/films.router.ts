import { FastifyInstance } from 'fastify';
import { FilmsController } from './films.controller';
import { filmsSchema, searchSchema } from './validation';

const registerFilmsRouter = (app: FastifyInstance) => {
  const filmsController = new FilmsController();

  app.route({
    method: 'GET',
    url: '/films',
    handler: filmsController.findAll,
    schema: filmsSchema,
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
    url: '/films/search',
    handler: filmsController.findFilmsBySearchString,
    schema: searchSchema,
  });

  app.route({
    method: 'GET',
    url: '/films/:id',
    handler: filmsController.findOne,
  });
};

export { registerFilmsRouter };
