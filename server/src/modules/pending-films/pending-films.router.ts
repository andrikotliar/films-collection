import { FastifyInstance } from 'fastify';
import {
  PendingFilmsCreateBodySchema,
  PendingFilmsDeleteParamsSchema,
  PendingFilmsQuerySchema,
  PendingFilmsUpdateParamsSchema,
  PendingFilmsUpdateBodySchema,
  PendingFilmsFindSchema,
} from './schemas';

export const PendingFilmsRouter = async (
  pendingFilmsModule: FastifyInstance,
) => {
  pendingFilmsModule.route({
    method: 'GET',
    url: '/',
    preHandler: [pendingFilmsModule.authenticate],
    schema: {
      querystring: PendingFilmsQuerySchema,
    },
    handler: pendingFilmsModule.pendingFilmsController.getList,
  });

  pendingFilmsModule.route({
    method: 'GET',
    url: '/:id',
    preHandler: [pendingFilmsModule.authenticate],
    schema: {
      params: PendingFilmsFindSchema,
    },
    handler: pendingFilmsModule.pendingFilmsController.findPendingFilm,
  });

  pendingFilmsModule.route({
    method: 'POST',
    url: '/',
    preHandler: [pendingFilmsModule.authenticate],
    schema: { body: PendingFilmsCreateBodySchema },
    handler: pendingFilmsModule.pendingFilmsController.createPendingFilm,
  });

  pendingFilmsModule.route({
    method: 'PATCH',
    url: '/:id',
    preHandler: [pendingFilmsModule.authenticate],
    schema: {
      params: PendingFilmsUpdateParamsSchema,
      body: PendingFilmsUpdateBodySchema,
    },
    handler: pendingFilmsModule.pendingFilmsController.updatePendingFilm,
  });

  pendingFilmsModule.route({
    method: 'DELETE',
    url: '/:id',
    preHandler: [pendingFilmsModule.authenticate],
    schema: { params: PendingFilmsDeleteParamsSchema },
    handler: pendingFilmsModule.pendingFilmsController.deletePendingFilm,
  });
};
