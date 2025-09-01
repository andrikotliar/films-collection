import { defineRoute, IdParamSchema, useRoutes } from 'src/common';
import { ManageGenreBodySchema } from './schemas';
import { genres } from 'src/modules/genres/genres.module';

export const genresRoutes = useRoutes('genres', [
  defineRoute({
    method: 'GET',
    url: '/',
    handler: async () => {
      const data = await genres.getBaseListData();

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
    handler: async ({ request }) => {
      const data = await genres.createGenre(request.body);

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
    handler: async ({ request }) => {
      const data = await genres.updateGenre(request.params.id, request.body);

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
    handler: async ({ request }) => {
      const data = await genres.deleteGenre(request.params.id);

      return {
        id: data.id,
      };
    },
  }),
]);
