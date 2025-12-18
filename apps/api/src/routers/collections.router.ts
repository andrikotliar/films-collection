import { defineRoute, createRouter, validateAuth } from '~/shared';
import {
  IdParamSchemaRef,
  CreateCollectionInputSchemaRef,
  UpdateCollectionInputSchemaRef,
} from '@films-collection/shared';

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
    schema: { body: CreateCollectionInputSchemaRef },
    preHandler: [validateAuth],
    handler: async ({ request, app }) => {
      const data = await app.container.resolve('collectionsService').createCollection(request.body);

      return { data };
    },
  }),

  defineRoute({
    method: 'PATCH',
    url: '/:id',
    schema: { params: IdParamSchemaRef, body: UpdateCollectionInputSchemaRef },
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
    schema: { params: IdParamSchemaRef },
    preHandler: [validateAuth],
    handler: async ({ request, app }) => {
      const data = await app.container
        .resolve('collectionsService')
        .deleteCollection(request.params.id);

      return { data: { id: data.id } };
    },
  }),
]);
