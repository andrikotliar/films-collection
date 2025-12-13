import { IdParamSchema, defineRoute, createRouter, validateAuth } from '~/shared';
import { ManageStudioBodySchema } from '~/services/studios/schemas';

export default createRouter([
  defineRoute({
    method: 'GET',
    url: '/',
    handler: async ({ app }) => {
      const data = await app.container.resolve('studiosService').getBaseDataList();

      return { data };
    },
  }),

  defineRoute({
    method: 'POST',
    url: '/',
    schema: {
      body: ManageStudioBodySchema,
    },

    preHandler: [validateAuth],
    handler: async ({ request, app }) => {
      const data = await app.container.resolve('studiosService').createStudio(request.body);

      return { data, status: 'CREATED' };
    },
  }),

  defineRoute({
    method: 'PATCH',
    url: '/:id',
    schema: {
      body: ManageStudioBodySchema,
      params: IdParamSchema,
    },
    preHandler: [validateAuth],
    handler: async ({ request, app }) => {
      const data = await app.container
        .resolve('studiosService')
        .updateStudio(request.params.id, request.body);

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
      const data = await app.container.resolve('studiosService').deleteStudio(request.params.id);

      return {
        data: { id: data.id },
      };
    },
  }),
]);
