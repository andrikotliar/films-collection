import { FastifyInstance } from 'fastify';

export const FilesRouter = async (filesModule: FastifyInstance) => {
  filesModule.route({
    method: 'POST',
    url: '/',
    handler: filesModule.filesController.uploadFile,
  });
};
