import { defineRoute, createRouter, validateAuth } from '~/shared';
import {
  buildListOptionSchema,
  ChapterKeyResponseSchema,
  CreateChapterKeyInputSchema,
} from '@films-collection/shared';
import z from 'zod';

export const chapterKeysRouter = createRouter([
  defineRoute({
    method: 'GET',
    url: '/options',
    schema: {
      response: buildListOptionSchema(z.string()),
    },
    handler: async ({ app }) => {
      const data = await app.container.resolve('chapterKeysService').getListOptions();

      return { data };
    },
  }),
  defineRoute({
    method: 'POST',
    url: '/',
    schema: {
      body: CreateChapterKeyInputSchema,
      response: ChapterKeyResponseSchema,
    },
    preHandler: [validateAuth],
    handler: async ({ request, app }) => {
      const data = await app.container.resolve('chapterKeysService').addKey(request.body);

      return { data };
    },
  }),
]);
