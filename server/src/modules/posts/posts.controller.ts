import { NotFoundException, router } from 'src/common';
import {
  CreatePostSchema,
  DeletePostSchema,
  GetListQueriesSchema,
  GetPostByKeyParamsSchema,
  GetPostByIdParamsSchema,
  UpdatePostParamsSchema,
  UpdatePostSchema,
} from './schemas';

export const PostsController = router((app, defineRoute) => [
  defineRoute({
    method: 'POST',
    url: '/',
    schema: {
      body: CreatePostSchema,
    },
    preHandler: [app.authenticate],
    handler: async ({ request }) => {
      const data = await app.postsService.createPost(request.body);

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
      const data = await app.postsService.getList(request.query);

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
      params: GetPostByKeyParamsSchema,
    },
    handler: async ({ request }) => {
      const data = await app.postsService.getPostByPageKey(
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
      params: GetPostByIdParamsSchema,
    },
    handler: async ({ request }) => {
      const data = await app.postsService.getPost(request.params.id);

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
      body: UpdatePostSchema,
      params: UpdatePostParamsSchema,
    },
    preHandler: [app.authenticate],
    handler: async ({ request }) => {
      const data = await app.postsService.updatePost(
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
      params: DeletePostSchema,
    },
    preHandler: [app.authenticate],
    handler: async ({ request }) => {
      const data = await app.postsService.deletePost(request.params.id);

      return {
        status: 'OK',
        data,
      };
    },
  }),
]);
