import { contracts } from '@films-collection/contracts';
import { createRouter } from '~/shared/helpers/create-router.js';
import { validateAuth } from '~/shared/pre-handlers/validate-auth.js';

export const filesRouter = createRouter(contracts.files, {
  getUploadUrl: {
    preHandler: [validateAuth],
    handler: async ({ request, app }) => {
      const url = await app.resolve('filesService').getUploadUrl(request.body);

      return { data: { url } };
    },
  },
});
