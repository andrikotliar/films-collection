import { IdParamSchema, defineRoute, useRoutes } from '~/common';
import { ManageStudioBodySchema } from '~/services/studios/schemas';

export const studiosRoutes = useRoutes('studios', [
  defineRoute({
    method: 'GET',
    url: '/',
    handler: async ({ app }) => {
      const data = await app.container.resolve('studiosService').getBaseDataList();

      return data;
    },
  }),

  defineRoute({
    method: 'POST',
    url: '/',
    schema: {
      body: ManageStudioBodySchema,
    },
    successStatus: 'CREATED',
    isPrivate: true,
    handler: async ({ request, app }) => {
      const data = await app.container.resolve('studiosService').createStudio(request.body);

      return data;
    },
  }),

  defineRoute({
    method: 'PATCH',
    url: '/:id',
    schema: {
      body: ManageStudioBodySchema,
      params: IdParamSchema,
    },
    isPrivate: true,
    handler: async ({ request, app }) => {
      const data = await app.container
        .resolve('studiosService')
        .updateStudio(request.params.id, request.body);

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
      const data = await app.container.resolve('studiosService').deleteStudio(request.params.id);

      return {
        id: data.id,
      };
    },
  }),
]);
