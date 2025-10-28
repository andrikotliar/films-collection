import { defineRoute, useRoutes } from '~/common';
import { CreateChapterKeySchema } from '~/services/chapter-keys';

export const chapterKeysRoutes = useRoutes('chapter-keys', [
  defineRoute({
    method: 'GET',
    url: '/options',
    handler: async ({ app }) => {
      const data = await app.container.resolve('chapterKeysService').getListOptions();

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
    handler: async ({ request, app }) => {
      const data = await app.container.resolve('chapterKeysService').addKey(request.body);

      return data;
    },
  }),
]);
