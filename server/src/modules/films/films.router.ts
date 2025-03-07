import { FastifyInstance } from 'fastify';
import {
  FilmsGetParamsSchema,
  FilmsQuerySchema,
  FilmsSearchQuerySchema,
} from './schemas';

export const FilmsRouter = async (filmsModule: FastifyInstance) => {
  filmsModule.route({
    method: 'GET',
    url: '/',
    handler: filmsModule.filmsController.findAll,
    schema: {
      querystring: FilmsQuerySchema,
    },
  });

  filmsModule.route({
    method: 'GET',
    url: '/search',
    handler: filmsModule.filmsController.findFilmsBySearchString,
    schema: {
      querystring: FilmsSearchQuerySchema,
    },
  });

  filmsModule.route({
    method: 'GET',
    url: '/:id',
    schema: { params: FilmsGetParamsSchema },
    handler: filmsModule.filmsController.findOne,
  });
};
