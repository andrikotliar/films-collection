import { defineRoute, createRouter, validateAuth } from '~/shared';
import {
  CreateAwardInputSchemaRef,
  UpdateAwardInputSchemaRef,
  FindNominationsQuerySchemaRef,
  IdParamSchemaRef,
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
      body: CreateAwardInputSchemaRef,
    },
    preHandler: [validateAuth],
    handler: async ({ request, app }) => {
      const data = await app.container.resolve('awardsService').createAward(request.body);

      return { data, status: 'CREATED' };
    },
  }),

  defineRoute({
    method: 'GET',
    url: '/nominations',
    schema: {
      querystring: FindNominationsQuerySchemaRef,
    },
    async handler({ request, app }) {
      if (!request.query.awardId) {
        return { data: [] };
      }

      const data = await app.container
        .resolve('awardsService')
        .getNominationsListOptions(request.query.awardId);

      return { data };
    },
  }),

  defineRoute({
    method: 'GET',
    url: '/:id',
    schema: {
      params: IdParamSchemaRef,
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
      params: IdParamSchemaRef,
      body: UpdateAwardInputSchemaRef,
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
      params: IdParamSchemaRef,
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
