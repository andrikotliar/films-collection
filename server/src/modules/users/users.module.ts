import { FastifyInstance } from 'fastify';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';
import fastifyPlugin from 'fastify-plugin';

export const UsersModule = fastifyPlugin(
  async (app: FastifyInstance) => {
    const usersRepository = new UsersRepository(app.database);
    const usersService = new UsersService(usersRepository);

    app.decorate('usersService', usersService);
  },
  { name: 'usersModule' },
);
