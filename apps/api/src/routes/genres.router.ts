import { defineRoute, IdParamSchema, createRouter, validateAuth } from '~/shared';
import { ManageGenreBodySchema } from '~/services/genres';

export default createRouter([
  defineRoute({
    method: 'GET',
    url: '/',
    handler: async ({ app }) => {
      const data = await app.container.resolve('genresService').getBaseListData();

      return { data };
    },
  }),

  defineRoute({
    method: 'POST',
    url: '/',
    schema: {
      body: ManageGenreBodySchema,
    },

    preHandler: [validateAuth],
    handler: async ({ request, app }) => {
      const data = await app.container.resolve('genresService').createGenre(request.body);

      return { data, status: 'CREATED' };
    },
  }),

  defineRoute({
    method: 'PATCH',
    url: '/:id',
    schema: {
      params: IdParamSchema,
      body: ManageGenreBodySchema,
    },
    preHandler: [validateAuth],
    handler: async ({ request, app }) => {
      const data = await app.container
        .resolve('genresService')
        .updateGenre(request.params.id, request.body);

      return { data };
    },
  }),

  defineRoute({
    method: 'DELETE',
    url: '/:id',
    schema: {
      params: IdParamSchema,
    },
    preHandler: [validateAuth],
    handler: async ({ request, app }) => {
      const data = await app.container.resolve('genresService').deleteGenre(request.params.id);

      return {
        data: { id: data.id },
      };
    },
  }),
]);
