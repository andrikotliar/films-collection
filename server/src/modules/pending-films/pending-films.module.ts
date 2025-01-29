import { FastifyInstance } from 'fastify';
import { PendingFilmsRepository } from './pending-films.repository';
import { PendingFilmsService } from './pending-films.service';
import { PendingFilmsController } from './pending-films.controller';
import { createPendingFilmsRouter } from './pending-films.router';

export const registerPendingFilmsModule = async (app: FastifyInstance) => {
  const pendingFilmsRepository = new PendingFilmsRepository(app.database);
  const pendingFilmsService = new PendingFilmsService(pendingFilmsRepository);
  const pendingFilmsController = new PendingFilmsController(
    pendingFilmsService,
  );

  await app.register(createPendingFilmsRouter(pendingFilmsController), {
    prefix: '/pending-films',
  });
};
