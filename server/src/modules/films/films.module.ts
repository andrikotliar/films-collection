import { FastifyInstance } from 'fastify';
import fastifyPlugin from 'fastify-plugin';
import { FilmsRepository } from './films.repository';
import { FilmsService } from './films.service';
import { FilmsController } from './films.controller';
import { FilmsRouter } from './films.router';

export const FilmsModule = fastifyPlugin(
  async (app: FastifyInstance) => {
    const filmsRepository = new FilmsRepository(app.database);

    app.decorate(
      'filmsService',
      new FilmsService(filmsRepository, {
        awardsService: app.awardsService,
        peopleService: app.peopleService,
        collectionsService: app.collectionsService,
      }),
    );

    app.decorate('filmsController', new FilmsController());

    app.register(FilmsRouter, { prefix: '/films' });
  },
  { name: 'filmsModule' },
);
