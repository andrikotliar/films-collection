import { defineRoute, createRouter, validateAuth } from '~/shared';
import {
  IdParamSchema,
  CreateCollectionInputSchema,
  UpdateCollectionInputSchema,
  CollectionsListResponseSchema,
  CollectionResponseSchema,
} from '@films-collection/shared';

export default createRouter([
  defineRoute({
    method: 'GET',
    url: '/',
    schema: {
      response: CollectionsListResponseSchema,
    },
    handler: async ({ app }) => {
      const data = await app.container.resolve('collectionsService').getGeneralDataList();

      return { data };
    },
  }),

  defineRoute({
    method: 'POST',
    url: '/',
    schema: { body: CreateCollectionInputSchema, response: CollectionResponseSchema },
    preHandler: [validateAuth],
    handler: async ({ request, app }) => {
      const data = await app.container.resolve('collectionsService').createCollection(request.body);

      return { data };
    },
  }),

  defineRoute({
    method: 'PATCH',
    url: '/:id',
    schema: {
      params: IdParamSchema,
      body: UpdateCollectionInputSchema,
      response: CollectionResponseSchema,
    },
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
    schema: { params: IdParamSchema, response: IdParamSchema },
    preHandler: [validateAuth],
    handler: async ({ request, app }) => {
      const data = await app.container
        .resolve('collectionsService')
        .deleteCollection(request.params.id);

      return { data: { id: data.id } };
    },
  }),
]);
