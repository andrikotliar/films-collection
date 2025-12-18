import { defineRoute, createRouter, validateAuth } from '~/shared';
import { CreateChapterKeyInputSchemaRef } from '@films-collection/shared';

export default createRouter([
  defineRoute({
    method: 'GET',
    url: '/options',
    handler: async ({ app }) => {
      const data = await app.container.resolve('chapterKeysService').getListOptions();

      return { data };
    },
  }),
  defineRoute({
    method: 'POST',
    url: '/',
    schema: {
      body: CreateChapterKeyInputSchemaRef,
    },
    preHandler: [validateAuth],
    handler: async ({ request, app }) => {
      const data = await app.container.resolve('chapterKeysService').addKey(request.body);

      return { data };
    },
  }),
]);
