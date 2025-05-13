import { NotFoundException, router } from 'src/common';
import {
  PendingFilmsCreateBodySchema,
  PendingFilmsDeleteParamsSchema,
  PendingFilmsFindSchema,
  PendingFilmsQuerySchema,
  PendingFilmsUpdateBodySchema,
  PendingFilmsUpdateParamsSchema,
} from './schemas';

export const PendingFilmsController = router((app, defineRoute) => [
  defineRoute({
    method: 'GET',
    url: '/',
    preHandler: [app.authenticate],
    schema: {
      querystring: PendingFilmsQuerySchema,
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
      params: PendingFilmsFindSchema,
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
    schema: { body: PendingFilmsCreateBodySchema },
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
      params: PendingFilmsUpdateParamsSchema,
      body: PendingFilmsUpdateBodySchema,
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
    schema: { params: PendingFilmsDeleteParamsSchema },
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
