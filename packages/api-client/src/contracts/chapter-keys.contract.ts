import {
  buildListOptionSchema,
  ChapterKeyResponseSchema,
  CreateChapterKeyInputSchema,
} from '@films-collection/shared';
import z from 'zod';
import { defineContracts } from '~/helpers';

export const chapterKeysContract = defineContracts('chapter-keys', {
  getOptions: {
    method: 'GET',
    url: 'options',
    schema: {
      response: buildListOptionSchema(z.string()),
    },
  },
  create: {
    method: 'POST',
    url: '',
    schema: {
      body: CreateChapterKeyInputSchema,
      response: ChapterKeyResponseSchema,
    },
  },
});
