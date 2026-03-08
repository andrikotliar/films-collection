import { defineRoute, createRouter, validateAuth } from '~/shared';
import { UploadFileResponseSchema, UploadFilePayloadSchema } from '@films-collection/shared';

export const filesRouter = createRouter([
  defineRoute({
    method: 'POST',
    url: '/upload/url',
    preHandler: [validateAuth],
    schema: {
      body: UploadFilePayloadSchema,
      response: UploadFileResponseSchema,
    },
    handler: async ({ request, app }) => {
      const url = await app.container.resolve('filesService').getUploadUrl(request.body);

      return { data: { url } };
    },
  }),
]);
