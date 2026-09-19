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
} from '@hobbies-collection/shared';
import { createContract } from '../helpers/index.js';

export const articlesContract = {
  create: createContract({
    method: 'POST',
    url: '/articles',
    schema: {
      body: CreateArticleSchema,
      response: ArticleResponseSchema,
    },
  }),
  getAdminList: createContract({
    method: 'GET',
    url: '/articles/admin',
    schema: {
      querystring: GetArticlesListQueriesSchema,
      response: ArticlesListResponseSchema,
    },
  }),
  getBySlug: createContract({
    method: 'GET',
    url: '/articles/content/:slug',
    schema: {
      params: GetArticleBySlugSchema,
      response: ArticleBySlugResponseSchema,
    },
  }),
  getById: createContract({
    method: 'GET',
    url: '/articles/:id',
    schema: {
      params: IdParamSchema,
      response: ArticleByIdResponseSchema,
    },
  }),
  update: createContract({
    method: 'PATCH',
    url: '/articles/:id',
    schema: {
      body: UpdateArticleSchema,
      params: IdParamSchema,
      response: ArticleResponseSchema,
    },
  }),
  delete: createContract({
    method: 'DELETE',
    url: '/articles/:id',
    schema: {
      params: IdParamSchema,
      response: IdParamSchema,
    },
  }),
};
