import { IdParamSchema, router } from 'src/common';
import { ManageGenreBodySchema } from './schemas';

export const GenresController = router((app, defineRoute) => [
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
      const data = await app.genresService.updateGenre(
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
