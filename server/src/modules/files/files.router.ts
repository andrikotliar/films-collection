import { FastifyInstance } from 'fastify';

export const FilesRouter = async (filesModule: FastifyInstance) => {
  filesModule.route({
    method: 'POST',
    url: '/',
    preHandler: [filesModule.authenticate],
    handler: filesModule.filesController.uploadFile,
  });
};
