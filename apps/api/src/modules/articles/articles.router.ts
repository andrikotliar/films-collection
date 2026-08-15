import { contracts } from '@films-collection/api-client';
import { NotFoundException, createRouter, validateAuth } from '~/shared/index.js';

export const articlesRouter = createRouter(contracts.articles, {
  create: {
    preHandler: [validateAuth],
    handler: async ({ request, app }) => {
      const data = await app.container.resolve('articlesService').create(request.body);

      return { data, status: 'CREATED' };
    },
  },
  getAdminList: {
    preHandler: [validateAuth],
    handler: async ({ request, app }) => {
      const data = await app.container.resolve('articlesService').getList(request.query);

      return { data };
    },
  },
  getBySlug: {
    handler: async ({ request, app }) => {
      const data = await app.container.resolve('articlesService').getBySlug(request.params.slug);

      if (!data) {
        throw new NotFoundException({
          message: `Content for key <${request.params.slug}> not found!`,
        });
      }

      return { data };
    },
  },
  getById: {
    handler: async ({ request, app }) => {
      const data = await app.container.resolve('articlesService').get(request.params.id);

      return { data };
    },
  },
  update: {
    preHandler: [validateAuth],
    handler: async ({ request, app }) => {
      const data = await app.container
        .resolve('articlesService')
        .update(request.params.id, request.body);

      return { data };
    },
  },
  delete: {
    preHandler: [validateAuth],
    handler: async ({ request, app }) => {
      await app.container.resolve('articlesService').delete(request.params.id);

      return { data: { id: request.params.id } };
    },
  },
});
