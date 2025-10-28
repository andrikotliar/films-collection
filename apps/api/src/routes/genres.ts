import { defineRoute, IdParamSchema, useRoutes } from '~/common';
import { ManageGenreBodySchema } from '~/services/genres';

export const genresRoutes = useRoutes('genres', [
  defineRoute({
    method: 'GET',
    url: '/',
    handler: async ({ app }) => {
      const data = await app.container.resolve('genresService').getBaseListData();

      return data;
    },
  }),

  defineRoute({
    method: 'POST',
    url: '/',
    schema: {
      body: ManageGenreBodySchema,
    },
    successStatus: 'CREATED',
    isPrivate: true,
    handler: async ({ request, app }) => {
      const data = await app.container.resolve('genresService').createGenre(request.body);

      return data;
    },
  }),

  defineRoute({
    method: 'PATCH',
    url: '/:id',
    schema: {
      params: IdParamSchema,
      body: ManageGenreBodySchema,
    },
    isPrivate: true,
    handler: async ({ request, app }) => {
      const data = await app.container
        .resolve('genresService')
        .updateGenre(request.params.id, request.body);

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
      const data = await app.container.resolve('genresService').deleteGenre(request.params.id);

      return {
        id: data.id,
      };
    },
  }),
]);
