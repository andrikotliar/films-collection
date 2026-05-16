import { createRouter, validateAuth } from '~/shared/index.js';
import { contracts } from '@films-collection/api-client';

export const filesRouter = createRouter(contracts.filesContract, {
  getUploadUrl: {
    preHandler: [validateAuth],
    handler: async ({ request, app }) => {
      const url = await app.container.resolve('filesService').getUploadUrl(request.body);

      return { data: { url } };
    },
  },
});
