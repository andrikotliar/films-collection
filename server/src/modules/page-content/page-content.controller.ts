import { IdParamSchema, NotFoundException, router } from 'src/common';
import {
  GetListQueriesSchema,
  UpdatePageContentSchema,
  GetPageContentByPageUrlParamsSchema,
  CreatePageContentSchema,
} from './schemas';

export const PageContentController = router((app, defineRoute) => [
  defineRoute({
    method: 'POST',
    url: '/',
    schema: {
      body: CreatePageContentSchema,
    },
    preHandler: [app.authenticate],
    handler: async ({ request }) => {
      const data = await app.pageContentService.createPageContent(request.body);

      return {
        status: 'CREATED',
        data,
      };
    },
  }),
  defineRoute({
    method: 'GET',
    url: '/admin',
    schema: {
      querystring: GetListQueriesSchema,
    },
    preHandler: [app.authenticate],
    handler: async ({ request }) => {
      const data = await app.pageContentService.getList(request.query);

      return {
        status: 'OK',
        data,
      };
    },
  }),
  defineRoute({
    method: 'GET',
    url: '/page/:pageKey',
    schema: {
      params: GetPageContentByPageUrlParamsSchema,
    },
    handler: async ({ request }) => {
      const data = await app.pageContentService.getPageContentByKey(
        request.params.pageKey,
      );

      if (!data) {
        throw new NotFoundException({
          message: `Post for page key ${request.params.pageKey} not found!`,
        });
      }

      return {
        status: 'OK',
        data,
      };
    },
  }),
  defineRoute({
    method: 'GET',
    url: '/:id',
    schema: {
      params: IdParamSchema,
    },
    handler: async ({ request }) => {
      const data = await app.pageContentService.getPageContent(
        request.params.id,
      );

      return {
        status: 'OK',
        data,
      };
    },
  }),
  defineRoute({
    method: 'PATCH',
    url: '/:id',
    schema: {
      body: UpdatePageContentSchema,
      params: IdParamSchema,
    },
    preHandler: [app.authenticate],
    handler: async ({ request }) => {
      const data = await app.pageContentService.updatePageContent(
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
    schema: {
      params: IdParamSchema,
    },
    preHandler: [app.authenticate],
    handler: async ({ request }) => {
      const data = await app.pageContentService.deletePageContent(
        request.params.id,
      );

      return {
        status: 'OK',
        data,
      };
    },
  }),
]);
