import { NotFoundException, router } from 'src/common';
import {
  CreatePendingFilmBodySchema,
  DeletePendingFilmParamsSchema,
  GetPendingFilmsListQuerySchema,
  UpdatePendingFilmBodySchema,
  UpdatePendingFilmParamsSchema,
  GetPendingFilmParamsSchema,
} from './schemas';

export const PendingFilmsController = router((app, defineRoute) => [
  defineRoute({
    method: 'GET',
    url: '/',
    preHandler: [app.authenticate],
    schema: {
      querystring: GetPendingFilmsListQuerySchema,
    },
    handler: async ({ request }) => {
      const data = await app.pendingFilmsService.getList(request.query);

      return {
        status: 'OK',
        data,
      };
    },
  }),
  defineRoute({
    method: 'GET',
    url: '/:id',
    preHandler: [app.authenticate],
    schema: {
      params: GetPendingFilmParamsSchema,
    },
    handler: async ({ request }) => {
      const data = app.pendingFilmsService.getPendingFilmById(
        request.params.id,
      );

      if (!data) {
        throw new NotFoundException({
          message: `Pending film ${request.params.id} not found`,
        });
      }

      return {
        status: 'OK',
        data,
      };
    },
  }),
  defineRoute({
    method: 'POST',
    url: '/',
    preHandler: [app.authenticate],
    schema: { body: CreatePendingFilmBodySchema },
    handler: async ({ request }) => {
      const data = await app.pendingFilmsService.createPendingFilm(
        request.body,
      );

      return {
        status: 'CREATED',
        data,
      };
    },
  }),
  defineRoute({
    method: 'PATCH',
    url: '/:id',
    preHandler: [app.authenticate],
    schema: {
      params: UpdatePendingFilmParamsSchema,
      body: UpdatePendingFilmBodySchema,
    },
    handler: async ({ request }) => {
      const data = await app.pendingFilmsService.updatePendingFilm(
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
    preHandler: [app.authenticate],
    schema: { params: DeletePendingFilmParamsSchema },
    handler: async ({ request }) => {
      const data = await app.pendingFilmsService.deletePendingFilm(
        request.params.id,
      );

      return {
        status: 'OK',
        data,
      };
    },
  }),
]);
