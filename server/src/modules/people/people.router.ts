import { FastifyInstance } from 'fastify';
import { SearchPersonSchema } from 'src/modules/people/schemas';

export const PeopleRouter = async (peopleModule: FastifyInstance) => {
  peopleModule.route({
    method: 'GET',
    url: '/search',
    schema: {
      querystring: SearchPersonSchema,
    },
    handler: peopleModule.peopleController.searchByName,
  });
};
