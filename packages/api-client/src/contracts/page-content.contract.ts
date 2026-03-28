import {
  IdParamSchema,
  CreatePageContentInputSchema,
  GetPageContentListQueriesSchema,
  GetPageContentByPageUrlParamsSchema,
  UpdatePageContentInputSchema,
  PageContentResponseSchema,
  PageContentsListResponseSchema,
  PageContentByKeyResponseSchema,
  PageContentByIdResponseSchema,
} from '@films-collection/shared';
import { defineContracts } from '~/helpers';

export const pageContentContract = defineContracts('page-content', {
  create: {
    method: 'POST',
    url: '',
    schema: {
      body: CreatePageContentInputSchema,
      response: PageContentResponseSchema,
    },
  },
  getAdminList: {
    method: 'GET',
    url: 'admin',
    schema: {
      querystring: GetPageContentListQueriesSchema,
      response: PageContentsListResponseSchema,
    },
  },
  getByPageKey: {
    method: 'GET',
    url: 'page/:pageKey',
    schema: {
      params: GetPageContentByPageUrlParamsSchema,
      response: PageContentByKeyResponseSchema,
    },
  },
  getById: {
    method: 'GET',
    url: ':id',
    schema: {
      params: IdParamSchema,
      response: PageContentByIdResponseSchema,
    },
  },
  update: {
    method: 'PATCH',
    url: ':id',
    schema: {
      body: UpdatePageContentInputSchema,
      params: IdParamSchema,
      response: PageContentResponseSchema,
    },
  },
  delete: {
    method: 'DELETE',
    url: ':id',
    schema: {
      params: IdParamSchema,
      response: IdParamSchema,
    },
  },
});
