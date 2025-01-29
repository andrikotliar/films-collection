import { FastifyInstance } from 'fastify';
import { FilmsRepository } from './films.repository';
import { FilmsService } from './films.service';
import { FilmsController } from './films.controller';
import { createFilmsRouter } from './films.router';

export const registerFilmsModule = async (app: FastifyInstance) => {
  const filmsRepository = new FilmsRepository(app.database);

  const filmsService = new FilmsService(filmsRepository, {
    awardsService: app.awardsService,
    peopleService: app.peopleService,
    collectionsService: app.collectionsService,
  });

  const filmsController = new FilmsController(filmsService);

  await app.register(createFilmsRouter(filmsController), { prefix: '/films' });
};
