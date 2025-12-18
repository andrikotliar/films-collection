import { defineRoute, createRouter, validateAuth } from '~/shared';
import { IdParamSchemaRef, StudioInputSchemaRef } from '@films-collection/shared';

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
      body: StudioInputSchemaRef,
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
      body: StudioInputSchemaRef,
      params: IdParamSchemaRef,
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
      params: IdParamSchemaRef,
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
