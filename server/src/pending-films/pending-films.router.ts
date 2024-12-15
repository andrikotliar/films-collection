import { FastifyInstance } from 'fastify';
import { PendingFilmsService } from './pending-films.service';
import { PendingFilmsModel } from './pending-films.model';
import { PendingFilmsController } from './pending-films.controller';
import { CreatePendingFilmRequest, GetPendingFilmRequest } from './types';

export const registerPendingFilmsRouter = (app: FastifyInstance) => {
  const pendingFilmsService = new PendingFilmsService(PendingFilmsModel);
  const pendingFilmsController = new PendingFilmsController(
    pendingFilmsService,
  );

  app.route({
    method: 'GET',
    url: '/pending-films',
    preHandler: [app.authenticate],
    handler: (request: GetPendingFilmRequest, reply) => {
      return pendingFilmsController.getList(request, reply);
    },
  });

  app.route({
    method: 'POST',
    url: '/pending-films',
    preHandler: [app.authenticate],
    handler: (request: CreatePendingFilmRequest, reply) => {
      return pendingFilmsController.createPendingFilm(request, reply);
    },
  });
};
