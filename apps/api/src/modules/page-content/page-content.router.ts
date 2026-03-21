import { pageContentContract } from '@films-collection/api-client';
import { NotFoundException, createRouter, validateAuth } from '~/shared';

export const pageContentRouter = createRouter(pageContentContract, {
  create: {
    preHandler: [validateAuth],
    handler: async ({ request, app }) => {
      const data = await app.container
        .resolve('pageContentService')
        .createPageContent(request.body);

      return { data, status: 'CREATED' };
    },
  },
  getAdminList: {
    preHandler: [validateAuth],
    handler: async ({ request, app }) => {
      const data = await app.container.resolve('pageContentService').getList(request.query);

      return { data };
    },
  },
  getByPageKey: {
    handler: async ({ request, app }) => {
      const data = await app.container
        .resolve('pageContentService')
        .getPageContentByKey(request.params.pageKey);

      if (!data) {
        throw new NotFoundException({
          message: `Content for key <${request.params.pageKey}> not found!`,
        });
      }

      return { data };
    },
  },
  getById: {
    handler: async ({ request, app }) => {
      const data = await app.container
        .resolve('pageContentService')
        .getPageContent(request.params.id);

      return { data };
    },
  },
  update: {
    preHandler: [validateAuth],
    handler: async ({ request, app }) => {
      const data = await app.container
        .resolve('pageContentService')
        .updatePageContent(request.params.id, request.body);

      return { data };
    },
  },
  delete: {
    preHandler: [validateAuth],
    handler: async ({ request, app }) => {
      await app.container.resolve('pageContentService').deletePageContent(request.params.id);

      return { data: { id: request.params.id } };
    },
  },
});
