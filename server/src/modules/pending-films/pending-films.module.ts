import { FastifyInstance } from 'fastify';
import { PendingFilmsRepository } from './pending-films.repository';
import { PendingFilmsService } from './pending-films.service';
import { PendingFilmsController } from './pending-films.controller';
import { PendingFilmsRouter } from './pending-films.router';
import fastifyPlugin from 'fastify-plugin';

export const PendingFilmsModule = fastifyPlugin(
  async (app: FastifyInstance) => {
    const pendingFilmsRepository = new PendingFilmsRepository(app.database);

    app.decorate(
      'pendingFilmsService',
      new PendingFilmsService(pendingFilmsRepository),
    );
    app.decorate('pendingFilmsController', new PendingFilmsController());

    app.register(PendingFilmsRouter, {
      prefix: '/pending-films',
    });
  },
);
