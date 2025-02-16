import { FastifyInstance } from 'fastify';
import { PeopleRepository } from './people.repository';
import { PeopleService } from './people.service';
import fastifyPlugin from 'fastify-plugin';

export const PeopleModule = fastifyPlugin(
  async (app: FastifyInstance) => {
    const peopleRepository = new PeopleRepository(app.database);
    const peopleService = new PeopleService(peopleRepository);

    app.decorate('peopleService', peopleService);
  },
  { name: 'peopleModule' },
);
