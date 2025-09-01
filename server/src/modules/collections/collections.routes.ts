import { IdParamSchema, defineRoute, useRoutes } from 'src/common';
import { CreateCollectionBodySchema, UpdateCollectionBodySchema } from './schemas';
import { collections } from 'src/modules/collections/collections.module';

export const collectionsRoutes = useRoutes('collections', [
  defineRoute({
    method: 'GET',
    url: '/',
    handler: async () => {
      const data = await collections.getGeneralDataList();

      return data;
    },
  }),

  defineRoute({
    method: 'POST',
    url: '/',
    schema: { body: CreateCollectionBodySchema },
    successStatus: 'CREATED',
    isPrivate: true,
    handler: async ({ request }) => {
      const data = await collections.createCollection(request.body);

      return data;
    },
  }),

  defineRoute({
    method: 'PATCH',
    url: '/:id',
    schema: { params: IdParamSchema, body: UpdateCollectionBodySchema },
    isPrivate: true,
    handler: async ({ request }) => {
      const data = await collections.updateCollection(request.params.id, request.body);

      return data;
    },
  }),

  defineRoute({
    method: 'DELETE',
    url: '/:id',
    schema: { params: IdParamSchema },
    isPrivate: true,
    handler: async ({ request }) => {
      const data = await collections.deleteCollection(request.params.id);

      return { id: data.id };
    },
  }),
]);
