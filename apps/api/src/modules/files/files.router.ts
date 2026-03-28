import { createRouter, validateAuth } from '~/shared';
import { filesContract } from '@films-collection/api-client';

export const filesRouter = createRouter(filesContract, {
  getUploadUrl: {
    preHandler: [validateAuth],
    handler: async ({ request, app }) => {
      const url = await app.container.resolve('filesService').getUploadUrl(request.body);

      return { data: { url } };
    },
  },
});
