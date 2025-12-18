import { NotFoundException, createRouter, defineRoute, validateAuth } from '~/shared';
import {
  IdParamSchemaRef,
  CreatePendingFilmInputSchemaRef,
  GetPendingFilmsListQuerySchemaRef,
  UpdatePendingFilmInputSchemaRef,
} from '@films-collection/shared';

export default createRouter([
  defineRoute({
    method: 'GET',
    url: '/',
    preHandler: [validateAuth],
    schema: {
      querystring: GetPendingFilmsListQuerySchemaRef,
    },
    handler: async ({ request, app }) => {
      const data = await app.container.resolve('pendingFilmsService').getList(request.query);

      return { data };
    },
  }),
  defineRoute({
    method: 'GET',
    url: '/:id',
    preHandler: [validateAuth],
    schema: {
      params: IdParamSchemaRef,
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

      return { data };
    },
  }),
  defineRoute({
    method: 'POST',
    url: '/',
    preHandler: [validateAuth],
    schema: { body: CreatePendingFilmInputSchemaRef },

    handler: async ({ request, app }) => {
      const data = await app.container
        .resolve('pendingFilmsService')
        .createPendingFilm(request.body);

      return { data, status: 'CREATED' };
    },
  }),
  defineRoute({
    method: 'PATCH',
    url: '/:id',
    preHandler: [validateAuth],
    schema: {
      params: IdParamSchemaRef,
      body: UpdatePendingFilmInputSchemaRef,
    },
    handler: async ({ request, app }) => {
      const data = await app.container
        .resolve('pendingFilmsService')
        .updatePendingFilm(request.params.id, request.body);

      return { data };
    },
  }),
  defineRoute({
    method: 'DELETE',
    url: '/:id',
    preHandler: [validateAuth],
    schema: { params: IdParamSchemaRef },
    handler: async ({ request, app }) => {
      const data = await app.container
        .resolve('pendingFilmsService')
        .deletePendingFilm(request.params.id);

      return { data };
    },
  }),
]);
