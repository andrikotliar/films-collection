import { router } from 'src/common';
import { CreatePersonSchema, SearchPersonSchema } from './schemas';

export const PeopleController = router((app, defineRoute) => [
  defineRoute({
    method: 'GET',
    url: '/search',
    schema: {
      querystring: SearchPersonSchema,
    },
    handler: async ({ request }) => {
      const data = await app.peopleService.searchPersonByTitle(request.query);

      return {
        status: 'OK',
        data,
      };
    },
  }),
  defineRoute({
    method: 'POST',
    url: '/',
    schema: {
      body: CreatePersonSchema,
    },
    preHandler: [app.authenticate],
    handler: async ({ request }) => {
      const data = await app.peopleService.createPerson(request.body);

      return {
        status: 'OK',
        data,
      };
    },
  }),
]);
