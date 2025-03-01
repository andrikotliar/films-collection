import { FastifyInstance } from 'fastify';
import { StudiosRepository } from './studios.repository';
import { StudiosService } from './studios.service';
import fastifyPlugin from 'fastify-plugin';

export const StudiosModule = fastifyPlugin(
  async (app: FastifyInstance) => {
    const studiosRepository = new StudiosRepository(app.database);
    const studiosService = new StudiosService(studiosRepository);

    app.decorate('studiosService', studiosService);
  },
  { name: 'studiosModule' },
);
