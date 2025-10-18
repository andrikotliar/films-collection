import { IdParamSchema, NotFoundException, defineRoute, useRoutes } from '~/common';
import {
  GetListQueriesSchema,
  UpdatePageContentSchema,
  GetPageContentByPageUrlParamsSchema,
  CreatePageContentSchema,
} from './schemas';
import { pageContent } from '~/modules/page-content/page-content.module';

export const pageContentRoutes = useRoutes('page-content', [
  defineRoute({
    method: 'POST',
    url: '/',
    schema: {
      body: CreatePageContentSchema,
    },
    isPrivate: true,
    successStatus: 'CREATED',
    handler: async ({ request }) => {
      const data = await pageContent.createPageContent(request.body);

      return data;
    },
  }),
  defineRoute({
    method: 'GET',
    url: '/admin',
    schema: {
      querystring: GetListQueriesSchema,
    },
    isPrivate: true,
    handler: async ({ request }) => {
      const data = await pageContent.getList(request.query);

      return data;
    },
  }),
  defineRoute({
    method: 'GET',
    url: '/page/:pageKey',
    schema: {
      params: GetPageContentByPageUrlParamsSchema,
    },
    handler: async ({ request }) => {
      const data = await pageContent.getPageContentByKey(request.params.pageKey);

      if (!data) {
        throw new NotFoundException({
          message: `Content for key <${request.params.pageKey}> not found!`,
        });
      }

      return data;
    },
  }),
  defineRoute({
    method: 'GET',
    url: '/:id',
    schema: {
      params: IdParamSchema,
    },
    handler: async ({ request }) => {
      const data = await pageContent.getPageContent(request.params.id);

      return data;
    },
  }),
  defineRoute({
    method: 'PATCH',
    url: '/:id',
    schema: {
      body: UpdatePageContentSchema,
      params: IdParamSchema,
    },
    isPrivate: true,
    handler: async ({ request }) => {
      const data = await pageContent.updatePageContent(request.params.id, request.body);

      return data;
    },
  }),
  defineRoute({
    method: 'DELETE',
    url: '/:id',
    schema: {
      params: IdParamSchema,
    },
    isPrivate: true,
    handler: async ({ request }) => {
      const data = await pageContent.deletePageContent(request.params.id);

      return data;
    },
  }),
]);
