import { FastifyInstance } from 'fastify';
import { PeopleRepository } from './people.repository';
import { PeopleService } from './people.service';
import fastifyPlugin from 'fastify-plugin';
import { PeopleController } from './people.controller';
import { PeopleRouter } from './people.router';

export const PeopleModule = fastifyPlugin(
  async (app: FastifyInstance) => {
    const peopleRepository = new PeopleRepository(app.database);
    const peopleService = new PeopleService(peopleRepository);

    app.decorate('peopleService', peopleService);
    app.decorate('peopleController', new PeopleController());

    app.register(PeopleRouter, { prefix: '/people' });
  },
  { name: 'peopleModule' },
);
