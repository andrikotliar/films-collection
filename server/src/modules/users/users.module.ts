import { FastifyInstance } from 'fastify';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';

export const registerUsersModule = (app: FastifyInstance) => {
  const usersRepository = new UsersRepository(app.database);
  const usersService = new UsersService(usersRepository);

  app.decorate('usersService', usersService);
};
