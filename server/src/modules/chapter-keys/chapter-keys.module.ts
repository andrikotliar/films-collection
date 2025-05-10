import { FastifyInstance } from 'fastify';
import fastifyPlugin from 'fastify-plugin';
import { ChapterKeysController } from './chapter-keys.controller';
import { ChapterKeysRepository } from './chapter-keys.repository';
import { ChapterKeysRouter } from './chapter-keys.router';
import { ChapterKeysService } from './chapter-keys.service';

export const ChapterKeysModule = fastifyPlugin(
  async (app: FastifyInstance) => {
    const chapterKeysRepository = new ChapterKeysRepository(app.database);

    app.decorate(
      'chapterKeysService',
      new ChapterKeysService(chapterKeysRepository),
    );
    app.decorate('chapterKeysController', new ChapterKeysController());

    app.register(ChapterKeysRouter, { prefix: '/chapter-keys' });
  },
  {
    name: 'chapter-keys',
  },
);
