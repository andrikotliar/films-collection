import { defineRoute, useRoutes } from '~/common';
import { CreateChapterKeySchema } from './schemas';
import { chapterKeys } from '~/modules/chapter-keys/chapter-keys.module';

export const chapterKeysRoutes = useRoutes('chapter-keys', [
  defineRoute({
    method: 'GET',
    url: '/options',
    handler: async () => {
      const data = await chapterKeys.getListOptions();

      return data;
    },
  }),
  defineRoute({
    method: 'POST',
    url: '/',
    schema: {
      body: CreateChapterKeySchema,
    },
    isPrivate: true,
    handler: async ({ request }) => {
      const data = await chapterKeys.addKey(request.body);

      return data;
    },
  }),
]);
