import { IdParamSchema, defineRoute, useRoutes } from '~/common';
import { AwardBodySchema, FindNominationsSchema } from '~/services/awards';

export const awardsRoutes = useRoutes('awards', [
  defineRoute({
    method: 'GET',
    url: '/',
    handler: async ({ app }) => {
      const data = await app.container.resolve('awardsService').getBaseDataList();

      return data;
    },
  }),

  defineRoute({
    method: 'POST',
    url: '/',
    schema: {
      body: AwardBodySchema,
    },
    successStatus: 'CREATED',
    isPrivate: true,
    handler: async ({ request, app }) => {
      const data = await app.container.resolve('awardsService').createAward(request.body);

      return data;
    },
  }),

  defineRoute({
    method: 'GET',
    url: '/nominations',
    schema: {
      querystring: FindNominationsSchema,
    },
    async handler({ request, app }) {
      if (!request.query.awardId) {
        return [];
      }

      const data = await app.container
        .resolve('awardsService')
        .getNominationsListOptions(request.query.awardId);

      return data;
    },
  }),

  defineRoute({
    method: 'GET',
    url: '/:id',
    schema: {
      params: IdParamSchema,
    },
    async handler({ request, app }) {
      const data = await app.container.resolve('awardsService').getAwardById(request.params.id, {
        includeNominations: true,
      });

      return data;
    },
  }),

  defineRoute({
    method: 'PATCH',
    url: '/:id',
    schema: {
      params: IdParamSchema,
      body: AwardBodySchema,
    },
    isPrivate: true,
    handler: async ({ request, app }) => {
      const data = await app.container
        .resolve('awardsService')
        .updateAward(request.params.id, request.body);

      return data;
    },
  }),

  defineRoute({
    method: 'DELETE',
    url: '/:id',
    schema: {
      params: IdParamSchema,
    },
    isPrivate: true,
    handler: async ({ request, app }) => {
      const data = await app.container.resolve('awardsService').deleteAward(request.params.id);

      return {
        id: data.id,
      };
    },
  }),
]);
