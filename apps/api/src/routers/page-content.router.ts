import { NotFoundException, defineRoute, createRouter, validateAuth } from '~/shared';
import {
  IdParamSchema,
  CreatePageContentInputSchema,
  GetListQueriesSchema,
  GetPageContentByPageUrlParamsSchema,
  UpdatePageContentInputSchema,
} from '@films-collection/shared';

export default createRouter([
  defineRoute({
    method: 'POST',
    url: '/',
    schema: {
      body: CreatePageContentInputSchema,
    },
    preHandler: [validateAuth],
    handler: async ({ request, app }) => {
      const data = await app.container
        .resolve('pageContentService')
        .createPageContent(request.body);

      return { data, status: 'CREATED' };
    },
  }),
  defineRoute({
    method: 'GET',
    url: '/admin',
    schema: {
      querystring: GetListQueriesSchema,
    },
    preHandler: [validateAuth],
    handler: async ({ request, app }) => {
      const data = await app.container.resolve('pageContentService').getList(request.query);

      return { data };
    },
  }),
  defineRoute({
    method: 'GET',
    url: '/page/:pageKey',
    schema: {
      params: GetPageContentByPageUrlParamsSchema,
    },
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
  }),
  defineRoute({
    method: 'GET',
    url: '/:id',
    schema: {
      params: IdParamSchema,
    },
    handler: async ({ request, app }) => {
      const data = await app.container
        .resolve('pageContentService')
        .getPageContent(request.params.id);

      return { data };
    },
  }),
  defineRoute({
    method: 'PATCH',
    url: '/:id',
    schema: {
      body: UpdatePageContentInputSchema,
      params: IdParamSchema,
    },
    preHandler: [validateAuth],
    handler: async ({ request, app }) => {
      const data = await app.container
        .resolve('pageContentService')
        .updatePageContent(request.params.id, request.body);

      return { data };
    },
  }),
  defineRoute({
    method: 'DELETE',
    url: '/:id',
    schema: {
      params: IdParamSchema,
    },
    preHandler: [validateAuth],
    handler: async ({ request, app }) => {
      const data = await app.container
        .resolve('pageContentService')
        .deletePageContent(request.params.id);

      return { data };
    },
  }),
]);
