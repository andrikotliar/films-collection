import { IdParamSchema, createRouter } from 'src/common';
import { AwardBodySchema, FindNominationsSchema } from './schemas';

export const createAwardsRouter = createRouter((app, defineRoute) => [
  defineRoute({
    method: 'GET',
    url: '/',
    handler: async () => {
      const data = await app.awardsService.getBaseDataList();

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
      body: AwardBodySchema,
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

      const data = await app.awardsService.getNominationsListOptions(request.query.awardId);

      return {
        status: 'OK',
        data,
      };
    },
  }),

  defineRoute({
    method: 'GET',
    url: '/:id',
    schema: {
      params: IdParamSchema,
    },
    async handler({ request }) {
      const data = await app.awardsService.getAwardById(request.params.id, {
        includeNominations: true,
      });

      return {
        status: 'OK',
        data,
      };
    },
  }),

  defineRoute({
    method: 'PATCH',
    url: '/:id',
    schema: {
      params: IdParamSchema,
      body: AwardBodySchema,
    },
    preHandler: [app.authenticate],
    handler: async ({ request }) => {
      const data = await app.awardsService.updateAward(request.params.id, request.body);

      return {
        status: 'OK',
        data,
      };
    },
  }),

  defineRoute({
    method: 'DELETE',
    url: '/:id',
    schema: {
      params: IdParamSchema,
    },
    preHandler: [app.authenticate],
    handler: async ({ request }) => {
      const data = await app.awardsService.deleteAward(request.params.id);

      return {
        status: 'OK',
        data: {
          id: data.id,
        },
      };
    },
  }),
]);
