import { defineRoute, createRouter, validateAuth } from '~/shared';
import {
  AwardResponseSchema,
  CreateAwardInputSchema,
  IdParamSchema,
  NullableIdParamSchema,
} from '@films-collection/shared';

export default createRouter([
  defineRoute({
    method: 'GET',
    url: '/',
    handler: async ({ app }) => {
      const data = await app.container.resolve('awardsService').getBaseDataList();

      return { data };
    },
  }),

  defineRoute({
    method: 'POST',
    url: '/',
    schema: {
      body: CreateAwardInputSchema,
      response: AwardResponseSchema,
    },
    preHandler: [validateAuth],
    handler: async ({ request, app }) => {
      const data = await app.container.resolve('awardsService').createAward(request.body);

      return { data, status: 'CREATED' };
    },
  }),

  defineRoute({
    method: 'GET',
    url: '/:id/nominations',
    schema: {
      params: NullableIdParamSchema,
    },
    async handler({ request, app }) {
      if (!request.params.id) {
        return { data: [] };
      }

      const data = await app.container
        .resolve('awardsService')
        .getNominationsListOptions(request.params.id);

      return { data };
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

      return { data };
    },
  }),

  defineRoute({
    method: 'PATCH',
    url: '/:id',
    schema: {
      params: IdParamSchema,
      body: CreateAwardInputSchema,
    },
    preHandler: [validateAuth],
    handler: async ({ request, app }) => {
      const data = await app.container
        .resolve('awardsService')
        .updateAward(request.params.id, request.body);

      return { data };
    },
  }),

  defineRoute({
    method: 'DELETE',
    url: '/:id',
    schema: {
      params: IdParamSchema,
    },
    preHandler: [validateAuth],
    handler: async ({ request, app }) => {
      const data = await app.container.resolve('awardsService').deleteAward(request.params.id);

      return {
        data: {
          id: data.id,
        },
      };
    },
  }),
]);
