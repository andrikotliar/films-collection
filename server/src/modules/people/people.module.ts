import { FastifyInstance } from 'fastify';
import { PeopleRepository } from './people.repository';
import { PeopleService } from './people.service';

export const registerPeopleModule = async (app: FastifyInstance) => {
  const peopleRepository = new PeopleRepository(app.database);
  const peopleService = new PeopleService(peopleRepository);

  app.decorate('peopleService', peopleService);
};
