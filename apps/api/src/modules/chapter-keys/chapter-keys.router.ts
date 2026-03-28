import { createRouter, validateAuth } from '~/shared';
import { chapterKeysContract } from '@films-collection/api-client';

export const chapterKeysRouter = createRouter(chapterKeysContract, {
  getOptions: {
    handler: async ({ app }) => {
      const data = await app.container.resolve('chapterKeysService').getListOptions();

      return { data };
    },
  },
  create: {
    preHandler: [validateAuth],
    handler: async ({ request, app }) => {
      const data = await app.container.resolve('chapterKeysService').addKey(request.body);

      return { data };
    },
  },
});
