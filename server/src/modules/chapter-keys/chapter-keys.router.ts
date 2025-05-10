import { FastifyInstance } from 'fastify';

export const ChapterKeysRouter = async (chapterKeysModule: FastifyInstance) => {
  chapterKeysModule.route({
    method: 'GET',
    url: '/options',
    handler: chapterKeysModule.chapterKeysController.findListOptions,
  });

  chapterKeysModule.route({
    method: 'POST',
    url: '/',
    preHandler: [chapterKeysModule.authenticate],
    handler: chapterKeysModule.chapterKeysController.addKey,
  });
};
