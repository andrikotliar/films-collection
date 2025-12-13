import { IdParamSchema, defineRoute, createRouter, validateAuth } from '~/shared';
import { CreateCollectionBodySchema, UpdateCollectionBodySchema } from '~/services/collections';

export default createRouter([
  defineRoute({
    method: 'GET',
    url: '/',
    handler: async ({ app }) => {
      const data = await app.container.resolve('collectionsService').getGeneralDataList();

      return { data };
    },
  }),

  defineRoute({
    method: 'POST',
    url: '/',
    schema: { body: CreateCollectionBodySchema },
    preHandler: [validateAuth],
    handler: async ({ request, app }) => {
      const data = await app.container.resolve('collectionsService').createCollection(request.body);

      return { data };
    },
  }),

  defineRoute({
    method: 'PATCH',
    url: '/:id',
    schema: { params: IdParamSchema, body: UpdateCollectionBodySchema },
    preHandler: [validateAuth],
    handler: async ({ request, app }) => {
      const data = await app.container
        .resolve('collectionsService')
        .updateCollection(request.params.id, request.body);

      return { data };
    },
  }),

  defineRoute({
    method: 'DELETE',
    url: '/:id',
    schema: { params: IdParamSchema },
    preHandler: [validateAuth],
    handler: async ({ request, app }) => {
      const data = await app.container
        .resolve('collectionsService')
        .deleteCollection(request.params.id);

      return { data: { id: data.id } };
    },
  }),
]);
