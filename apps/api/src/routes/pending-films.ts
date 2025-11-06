import { IdParamSchema, NotFoundException, useRoutes, defineRoute } from '~/lib';
import {
  CreatePendingFilmBodySchema,
  GetPendingFilmParamsSchema,
  GetPendingFilmsListQuerySchema,
  UpdatePendingFilmBodySchema,
} from '~/services/pending-films';

export const pendingFilmsRoutes = useRoutes('pending-films', [
  defineRoute({
    method: 'GET',
    url: '/',
    isPrivate: true,
    schema: {
      querystring: GetPendingFilmsListQuerySchema,
    },
    handler: async ({ request, app }) => {
      const data = await app.container.resolve('pendingFilmsService').getList(request.query);

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
    handler: async ({ request, app }) => {
      const data = await app.container
        .resolve('pendingFilmsService')
        .getPendingFilmById(request.params.id);

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
    handler: async ({ request, app }) => {
      const data = await app.container
        .resolve('pendingFilmsService')
        .createPendingFilm(request.body);

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
    handler: async ({ request, app }) => {
      const data = await app.container
        .resolve('pendingFilmsService')
        .updatePendingFilm(request.params.id, request.body);

      return data;
    },
  }),
  defineRoute({
    method: 'DELETE',
    url: '/:id',
    isPrivate: true,
    schema: { params: IdParamSchema },
    handler: async ({ request, app }) => {
      const data = await app.container
        .resolve('pendingFilmsService')
        .deletePendingFilm(request.params.id);

      return data;
    },
  }),
]);
