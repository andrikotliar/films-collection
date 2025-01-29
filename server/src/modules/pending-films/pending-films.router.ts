import { FastifyInstance } from 'fastify';
import { PendingFilmsController } from './pending-films.controller';

export const createPendingFilmsRouter = (
  pendingFilmsController: PendingFilmsController,
) => {
  return async (pendingFilmsModule: FastifyInstance) => {
    pendingFilmsModule.route({
      method: 'GET',
      url: '/',
      preHandler: [pendingFilmsModule.authenticate],
      handler: pendingFilmsController.getList.bind(pendingFilmsController),
    });

    pendingFilmsModule.route({
      method: 'POST',
      url: '/',
      preHandler: [pendingFilmsModule.authenticate],
      handler: pendingFilmsController.createPendingFilm.bind(
        pendingFilmsController,
      ),
    });

    pendingFilmsModule.route({
      method: 'PATCH',
      url: '/:filmId',
      preHandler: [pendingFilmsModule.authenticate],
      handler: pendingFilmsController.updatePendingFilm.bind(
        pendingFilmsController,
      ),
    });

    pendingFilmsModule.route({
      method: 'DELETE',
      url: '/:filmId',
      preHandler: [pendingFilmsModule.authenticate],
      handler: pendingFilmsController.deletePendingFilm.bind(
        pendingFilmsController,
      ),
    });
  };
};
