import { FastifyInstance } from 'fastify';
import { PendingFilmsService } from './pending-films.service';
import { PendingFilmsModel } from './pending-films.model';
import { PendingFilmsController } from './pending-films.controller';
import { CreatePendingFilmRequest } from './types';

export const registerPendingFilmsRouter = (app: FastifyInstance) => {
  const pendingFilmsService = new PendingFilmsService(PendingFilmsModel);
  const pendingFilmsController = new PendingFilmsController(
    pendingFilmsService,
  );

  app.route({
    method: 'GET',
    url: '/pending-films',
    preHandler: [app.authenticate],
    handler: (...attrs) => {
      return pendingFilmsController.getList(...attrs);
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
