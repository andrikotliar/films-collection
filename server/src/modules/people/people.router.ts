import { FastifyInstance } from 'fastify';
import { CreatePersonSchema, SearchPersonSchema } from './schemas';

export const PeopleRouter = async (peopleModule: FastifyInstance) => {
  peopleModule.route({
    method: 'GET',
    url: '/search',
    schema: {
      querystring: SearchPersonSchema,
    },
    handler: peopleModule.peopleController.searchByName,
  });

  peopleModule.route({
    method: 'POST',
    url: '/',
    schema: {
      body: CreatePersonSchema,
    },
    preHandler: [peopleModule.authenticate],
    handler: peopleModule.peopleController.createPerson,
  });
};
