import { IdParamSchema, router } from 'src/common';
import { ManageStudioBodySchema } from 'src/modules/studios/schemas';

export const StudiosController = router((app, defineRoute) => [
  defineRoute({
    method: 'GET',
    url: '/',
    handler: async () => {
      const data = await app.studiosService.getBaseDataList();

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
      body: ManageStudioBodySchema,
    },
    preHandler: [app.authenticate],
    handler: async ({ request }) => {
      const data = await app.studiosService.createStudio(request.body);

      return {
        status: 'CREATED',
        data,
      };
    },
  }),

  defineRoute({
    method: 'PATCH',
    url: '/:id',
    schema: {
      body: ManageStudioBodySchema,
      params: IdParamSchema,
    },
    preHandler: [app.authenticate],
    handler: async ({ request }) => {
      const data = await app.studiosService.updateStudio(
        request.params.id,
        request.body,
      );

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
      const data = await app.studiosService.deleteStudio(request.params.id);

      return {
        status: 'OK',
        data: {
          id: data.id,
        },
      };
    },
  }),
]);
