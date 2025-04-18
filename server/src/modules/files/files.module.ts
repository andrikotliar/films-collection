import { FastifyInstance } from 'fastify';
import fastifyPlugin from 'fastify-plugin';
import { env } from 'src/common';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { FilesRouter } from './files.router';

export const FilesModule = fastifyPlugin(
  async (app: FastifyInstance) => {
    app.decorate('filesService', new FilesService(env));

    app.decorate('filesController', new FilesController());

    app.register(FilesRouter, { prefix: '/files' });
  },
  {
    name: 'filesModule',
  },
);
