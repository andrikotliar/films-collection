import { createRouter } from 'src/common';
import { CreateChapterKeySchema } from './schemas';

export const createChapterKeysRouter = createRouter((app, defineRoute) => [
  defineRoute({
    method: 'GET',
    url: '/options',
    handler: async () => {
      const data = await app.chapterKeysService.getListOptions();

      return {
        status: 'OK',
        data,
      };
    },
  }),
  defineRoute({
    method: 'POST',
    url: '/',
    schema: {
      body: CreateChapterKeySchema,
    },
    preHandler: [app.authenticate],
    handler: async ({ request }) => {
      const data = await app.chapterKeysService.addKey(request.body);

      return {
        status: 'OK',
        data,
      };
    },
  }),
]);
