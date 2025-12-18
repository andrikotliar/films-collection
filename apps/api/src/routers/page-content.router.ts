import { NotFoundException, defineRoute, createRouter, validateAuth } from '~/shared';
import {
  IdParamSchemaRef,
  CreatePageContentInputSchemaRef,
  GetPageContentListQueriesSchemaRef,
  GetPageContentByPageUrlParamsSchemaRef,
  UpdatePageContentInputSchemaRef,
} from '@films-collection/shared';

export default createRouter([
  defineRoute({
    method: 'POST',
    url: '/',
    schema: {
      body: CreatePageContentInputSchemaRef,
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
      querystring: GetPageContentListQueriesSchemaRef,
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
      params: GetPageContentByPageUrlParamsSchemaRef,
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
      params: IdParamSchemaRef,
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
      body: UpdatePageContentInputSchemaRef,
      params: IdParamSchemaRef,
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
      params: IdParamSchemaRef,
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
