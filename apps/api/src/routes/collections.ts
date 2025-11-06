import { IdParamSchema, defineRoute, useRoutes } from '~/lib';
import { CreateCollectionBodySchema, UpdateCollectionBodySchema } from '~/services/collections';

export const collectionsRoutes = useRoutes('collections', [
  defineRoute({
    method: 'GET',
    url: '/',
    handler: async ({ app }) => {
      const data = await app.container.resolve('collectionsService').getGeneralDataList();

      return data;
    },
  }),

  defineRoute({
    method: 'POST',
    url: '/',
    schema: { body: CreateCollectionBodySchema },
    successStatus: 'CREATED',
    isPrivate: true,
    handler: async ({ request, app }) => {
      const data = await app.container.resolve('collectionsService').createCollection(request.body);

      return data;
    },
  }),

  defineRoute({
    method: 'PATCH',
    url: '/:id',
    schema: { params: IdParamSchema, body: UpdateCollectionBodySchema },
    isPrivate: true,
    handler: async ({ request, app }) => {
      const data = await app.container
        .resolve('collectionsService')
        .updateCollection(request.params.id, request.body);

      return data;
    },
  }),

  defineRoute({
    method: 'DELETE',
    url: '/:id',
    schema: { params: IdParamSchema },
    isPrivate: true,
    handler: async ({ request, app }) => {
      const data = await app.container
        .resolve('collectionsService')
        .deleteCollection(request.params.id);

      return { id: data.id };
    },
  }),
]);
