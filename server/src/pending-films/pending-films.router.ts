import { FastifyInstance } from 'fastify';
import { PendingFilmsService } from './pending-films.service';
import { PendingFilmsModel } from './pending-films.model';
import { PendingFilmsController } from './pending-films.controller';

export const registerPendingFilmsRouter = (app: FastifyInstance) => {
  const pendingFilmsService = new PendingFilmsService(PendingFilmsModel);
  const pendingFilmsController = new PendingFilmsController(
    pendingFilmsService,
  );

  app.route({
    method: 'GET',
    url: '/pending-films',
    preHandler: [app.authenticate],
    handler: pendingFilmsController.getList.bind(pendingFilmsController),
  });

  app.route({
    method: 'POST',
    url: '/pending-films',
    preHandler: [app.authenticate],
    handler: pendingFilmsController.createPendingFilm.bind(
      pendingFilmsController,
    ),
  });

  app.route({
    method: 'DELETE',
    url: '/pending-films/:filmId',
    preHandler: [app.authenticate],
    handler: pendingFilmsController.deletePendingFilm.bind(
      pendingFilmsController,
    ),
  });
};
