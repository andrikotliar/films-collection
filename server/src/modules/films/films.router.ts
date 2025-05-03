import { FastifyInstance } from 'fastify';
import {
  FilmsAdminGetListQuerySchema,
  FilmsGetParamsSchema,
  FilmsQuerySchema,
  FilmsRelatedChaptersSchema,
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
    url: '/admin',
    preHandler: [filmsModule.authenticate],
    schema: {
      querystring: FilmsAdminGetListQuerySchema,
    },
    handler: filmsModule.filmsController.getAdminList,
  });

  filmsModule.route({
    method: 'GET',
    url: '/chapters',
    preHandler: [filmsModule.authenticate],
    schema: {
      querystring: FilmsRelatedChaptersSchema,
    },
    handler: filmsModule.filmsController.findRelatedChapters,
  });

  filmsModule.route({
    method: 'GET',
    url: '/:id',
    schema: { params: FilmsGetParamsSchema },
    handler: filmsModule.filmsController.findOne,
  });
};
