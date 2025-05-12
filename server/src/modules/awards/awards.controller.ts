import { router } from 'src/common';
import { FindNominationsSchema } from './schemas';

export const AwardsController = router((app, defineRoute) => [
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
