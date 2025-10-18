import { IdParamSchema, defineRoute, useRoutes } from '~/common';
import { AwardBodySchema, FindNominationsSchema } from './schemas';
import { awards } from '~/modules/awards/awards.module';

export const awardsRoutes = useRoutes('awards', [
  defineRoute({
    method: 'GET',
    url: '/',
    handler: async () => {
      const data = await awards.getBaseDataList();

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
    handler: async ({ request }) => {
      const data = await awards.createAward(request.body);

      return data;
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
        return [];
      }

      const data = await awards.getNominationsListOptions(request.query.awardId);

      return data;
    },
  }),

  defineRoute({
    method: 'GET',
    url: '/:id',
    schema: {
      params: IdParamSchema,
    },
    async handler({ request }) {
      const data = await awards.getAwardById(request.params.id, {
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
    handler: async ({ request }) => {
      const data = await awards.updateAward(request.params.id, request.body);

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
    handler: async ({ request }) => {
      const data = await awards.deleteAward(request.params.id);

      return {
        id: data.id,
      };
    },
  }),
]);
