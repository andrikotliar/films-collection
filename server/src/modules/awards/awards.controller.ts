import { router } from 'src/common';
import { CreateAwardBodySchema, FindNominationsSchema } from './schemas';

export const AwardsController = router((app, defineRoute) => [
  defineRoute({
    method: 'POST',
    url: '/',
    schema: {
      body: CreateAwardBodySchema,
    },
    preHandler: [app.authenticate],
    handler: async ({ request }) => {
      const data = await app.awardsService.createAward(request.body);

      return {
        status: 'CREATED',
        data,
      };
    },
  }),

  defineRoute({
    method: 'GET',
    url: '/nominations',
    schema: {
      querystring: FindNominationsSchema,
    },
    async handler({ request }) {
      if (!request.query.awardId) {
        return {
          status: 'OK',
          data: [],
        };
      }

      const data = await app.awardsService.getNominationsListOptions(
        request.query.awardId,
      );

      return {
        status: 'OK',
        data,
      };
    },
  }),
]);
