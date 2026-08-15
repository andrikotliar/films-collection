import {
  IdParamSchema,
  CreateArticleSchema,
  GetArticlesListQueriesSchema,
  GetArticleBySlugSchema,
  UpdateArticleSchema,
  ArticleResponseSchema,
  ArticlesListResponseSchema,
  ArticleBySlugResponseSchema,
  ArticleByIdResponseSchema,
} from '@films-collection/shared';
import { createContract } from '~/helpers/index.js';

export const articlesContract = {
  create: createContract({
    method: 'POST',
    url: '',
    schema: {
      body: CreateArticleSchema,
      response: ArticleResponseSchema,
    },
  }),
  getAdminList: createContract({
    method: 'GET',
    url: 'admin',
    schema: {
      querystring: GetArticlesListQueriesSchema,
      response: ArticlesListResponseSchema,
    },
  }),
  getByPageKey: createContract({
    method: 'GET',
    url: 'content/:slug',
    schema: {
      params: GetArticleBySlugSchema,
      response: ArticleBySlugResponseSchema,
    },
  }),
  getById: createContract({
    method: 'GET',
    url: ':id',
    schema: {
      params: IdParamSchema,
      response: ArticleByIdResponseSchema,
    },
  }),
  update: createContract({
    method: 'PATCH',
    url: ':id',
    schema: {
      body: UpdateArticleSchema,
      params: IdParamSchema,
      response: ArticleResponseSchema,
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
