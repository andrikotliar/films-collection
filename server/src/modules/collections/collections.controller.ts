import { IdParamSchema, router } from 'src/common';
import {
  CreateCollectionBodySchema,
  UpdateCollectionBodySchema,
} from './schemas';

export const CollectionsController = router((app, defineRoute) => [
  defineRoute({
    method: 'POST',
    url: '/',
    schema: { body: CreateCollectionBodySchema },
    preHandler: [app.authenticate],
    handler: async ({ request }) => {
      const data = await app.collectionsService.createCollection(request.body);

      return {
        status: 'CREATED',
        data,
      };
    },
  }),

  defineRoute({
    method: 'PATCH',
    url: '/:id',
    schema: { params: IdParamSchema, body: UpdateCollectionBodySchema },
    preHandler: [app.authenticate],
    handler: async ({ request }) => {
      const data = await app.collectionsService.updateCollection(
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
    schema: { params: IdParamSchema },
    preHandler: [app.authenticate],
    handler: async ({ request }) => {
      const data = await app.collectionsService.deleteCollection(
        request.params.id,
      );

      return {
        status: 'OK',
        data: { id: data.id },
      };
    },
  }),
]);
