import { contracts } from '@films-collection/api-client';
import { NotFoundException } from '~/shared/exceptions/not-found.js';
import { createRouter } from '~/shared/helpers/create-router.js';
import { validateAuth } from '~/shared/pre-handlers/validate-auth.js';

export const articlesRouter = createRouter(contracts.articles, {
  create: {
    preHandler: [validateAuth],
    handler: async ({ request, services: { ArticlesService } }) => {
      const data = await ArticlesService.create(request.body);

      return { data, status: 'CREATED' };
    },
  },
  getAdminList: {
    preHandler: [validateAuth],
    handler: async ({ request, services: { ArticlesService } }) => {
      const data = await ArticlesService.getList(request.query);

      return { data };
    },
  },
  getBySlug: {
    handler: async ({ request, services: { ArticlesService } }) => {
      const data = await ArticlesService.getBySlug(request.params.slug);

      if (!data) {
        throw new NotFoundException({
          message: `Content for key <${request.params.slug}> not found!`,
        });
      }

      return { data };
    },
  },
  getById: {
    handler: async ({ request, services: { ArticlesService } }) => {
      const data = await ArticlesService.get(request.params.id);

      return { data };
    },
  },
  update: {
    preHandler: [validateAuth],
    handler: async ({ request, services: { ArticlesService } }) => {
      const data = await ArticlesService.update(request.params.id, request.body);

      return { data };
    },
  },
  delete: {
    preHandler: [validateAuth],
    handler: async ({ request, services: { ArticlesService } }) => {
      await ArticlesService.delete(request.params.id);

      return { data: { id: request.params.id } };
    },
  },
});
