import { IdParamSchema, defineRoute, useRoutes } from '~/common';
import { ManageStudioBodySchema } from '~/modules/studios/schemas';
import { studios } from '~/modules/studios/studios.module';

export const studiosRoutes = useRoutes('studios', [
  defineRoute({
    method: 'GET',
    url: '/',
    handler: async (_) => {
      const data = await studios.getBaseDataList();

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
    handler: async ({ request }) => {
      const data = await studios.createStudio(request.body);

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
    handler: async ({ request }) => {
      const data = await studios.updateStudio(request.params.id, request.body);

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
      const data = await studios.deleteStudio(request.params.id);

      return {
        id: data.id,
      };
    },
  }),
]);
