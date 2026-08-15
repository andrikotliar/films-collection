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
import { createContract } from '~/helpers/index.js';

export const pageContentContract = {
  create: createContract({
    method: 'POST',
    url: '',
    schema: {
      body: CreatePageContentInputSchema,
      response: PageContentResponseSchema,
    },
  }),
  getAdminList: createContract({
    method: 'GET',
    url: 'admin',
    schema: {
      querystring: GetPageContentListQueriesSchema,
      response: PageContentsListResponseSchema,
    },
  }),
  getByPageKey: createContract({
    method: 'GET',
    url: 'page/:pageKey',
    schema: {
      params: GetPageContentByPageUrlParamsSchema,
      response: PageContentByKeyResponseSchema,
    },
  }),
  getById: createContract({
    method: 'GET',
    url: ':id',
    schema: {
      params: IdParamSchema,
      response: PageContentByIdResponseSchema,
    },
  }),
  update: createContract({
    method: 'PATCH',
    url: ':id',
    schema: {
      body: UpdatePageContentInputSchema,
      params: IdParamSchema,
      response: PageContentResponseSchema,
    },
  }),
  delete: createContract({
    method: 'DELETE',
    url: ':id',
    schema: {
      params: IdParamSchema,
      response: IdParamSchema,
    },
  }),
};
