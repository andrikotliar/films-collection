import { NotFoundException, router } from 'src/common';
import {
  CreatePostSchema,
  GetPostParamsSchema,
  UpdatePostParamsSchema,
  UpdatePostSchema,
} from 'src/modules/posts/schemas';

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
    url: '/page/:pageKey',
    schema: {
      params: GetPostParamsSchema,
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
]);
