import { IdParamSchema, createRouter } from 'src/common';
import { ManageGenreBodySchema } from './schemas';

export const createGenresRouter = createRouter((app, defineRoute) => [
  defineRoute({
    method: 'GET',
    url: '/',
    handler: async () => {
      const data = await app.genresService.getBaseListData();

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
      body: ManageGenreBodySchema,
    },
    preHandler: [app.authenticate],
    handler: async ({ request }) => {
      const data = await app.genresService.createGenre(request.body);

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
      params: IdParamSchema,
      body: ManageGenreBodySchema,
    },
    preHandler: [app.authenticate],
    handler: async ({ request }) => {
      const data = await app.genresService.updateGenre(request.params.id, request.body);

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
      const data = await app.genresService.deleteGenre(request.params.id);

      return {
        status: 'OK',
        data: {
          id: data.id,
        },
      };
    },
  }),
]);
