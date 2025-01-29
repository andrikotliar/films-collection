import { FastifyInstance } from 'fastify';
import { StudiosRepository } from './studios.repository';
import { StudiosService } from './studios.service';

export const registerStudiosModule = async (app: FastifyInstance) => {
  const studiosRepository = new StudiosRepository(app.database);
  const studiosService = new StudiosService(studiosRepository);

  app.decorate('studiosService', studiosService);
};
