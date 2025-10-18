import { IdParamSchema, NotFoundException, useRoutes, defineRoute } from '~/common';
import {
  CreatePendingFilmBodySchema,
  GetPendingFilmParamsSchema,
  GetPendingFilmsListQuerySchema,
  UpdatePendingFilmBodySchema,
} from './schemas';
import { pendingFilms } from '~/modules/pending-films/pending-films.module';

export const pendingFilmsRoutes = useRoutes('pending-films', [
  defineRoute({
    method: 'GET',
    url: '/',
    isPrivate: true,
    schema: {
      querystring: GetPendingFilmsListQuerySchema,
    },
    handler: async ({ request }) => {
      const data = await pendingFilms.getList(request.query);

      return data;
    },
  }),
  defineRoute({
    method: 'GET',
    url: '/:id',
    isPrivate: true,
    schema: {
      params: GetPendingFilmParamsSchema,
    },
    handler: async ({ request }) => {
      const data = await pendingFilms.getPendingFilmById(request.params.id);

      if (!data) {
        throw new NotFoundException({
          message: `Pending film ${request.params.id} not found`,
        });
      }

      return data;
    },
  }),
  defineRoute({
    method: 'POST',
    url: '/',
    isPrivate: true,
    schema: { body: CreatePendingFilmBodySchema },
    successStatus: 'CREATED',
    handler: async ({ request }) => {
      const data = await pendingFilms.createPendingFilm(request.body);

      return data;
    },
  }),
  defineRoute({
    method: 'PATCH',
    url: '/:id',
    isPrivate: true,
    schema: {
      params: IdParamSchema,
      body: UpdatePendingFilmBodySchema,
    },
    handler: async ({ request }) => {
      const data = await pendingFilms.updatePendingFilm(request.params.id, request.body);

      return data;
    },
  }),
  defineRoute({
    method: 'DELETE',
    url: '/:id',
    isPrivate: true,
    schema: { params: IdParamSchema },
    handler: async ({ request }) => {
      const data = await pendingFilms.deletePendingFilm(request.params.id);

      return data;
    },
  }),
]);
