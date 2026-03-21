import { pendingFilmsContract } from '@films-collection/api-client';
import { NotFoundException, createRouter, validateAuth } from '~/shared';

export const pendingFilmsRouter = createRouter(pendingFilmsContract, {
  getList: {
    preHandler: [validateAuth],
    handler: async ({ request, app }) => {
      const data = await app.container.resolve('pendingFilmsService').getList(request.query);

      return { data };
    },
  },
  getById: {
    preHandler: [validateAuth],
    handler: async ({ request, app }) => {
      const data = await app.container
        .resolve('pendingFilmsService')
        .getPendingFilmById(request.params.id);

      if (!data) {
        throw new NotFoundException({
          message: `Pending film ${request.params.id} not found`,
        });
      }

      return { data };
    },
  },
  create: {
    preHandler: [validateAuth],
    handler: async ({ request, app }) => {
      const data = await app.container
        .resolve('pendingFilmsService')
        .createPendingFilm(request.body);

      return { data, status: 'CREATED' };
    },
  },
  update: {
    preHandler: [validateAuth],
    handler: async ({ request, app }) => {
      const data = await app.container
        .resolve('pendingFilmsService')
        .updatePendingFilm(request.params.id, request.body);

      return { data };
    },
  },
  delete: {
    preHandler: [validateAuth],
    handler: async ({ request, app }) => {
      await app.container.resolve('pendingFilmsService').deletePendingFilm(request.params.id);

      return { data: { id: request.params.id } };
    },
  },
});
