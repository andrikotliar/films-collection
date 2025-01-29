import { FastifyInstance } from 'fastify';
import { FilmsController } from './films.controller';
import { filmsSchema, searchSchema } from './validation';

export const createFilmsRouter = (filmsController: FilmsController) => {
  return (filmsModule: FastifyInstance) => {
    filmsModule.route({
      method: 'GET',
      url: '/',
      handler: filmsController.findAll.bind(filmsController),
      schema: filmsSchema,
    });

    filmsModule.route({
      method: 'GET',
      url: '/anniversaries',
      handler: filmsController.findAnniversaries.bind(filmsController),
    });

    filmsModule.route({
      method: 'GET',
      url: '/search',
      handler: filmsController.findFilmsBySearchString.bind(filmsController),
      schema: searchSchema,
    });

    filmsModule.route({
      method: 'GET',
      url: '/:id',
      handler: filmsController.findOne.bind(filmsController),
    });
  };
};
