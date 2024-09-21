import fastifyStatic from '@fastify/static';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const initStatic = (app: FastifyInstance) => {
  app.register(fastifyStatic, {
    root: path.join(__dirname, 'public'),
    prefix: '/',
  });

  app.setNotFoundHandler((_: FastifyRequest, reply: FastifyReply) => {
    reply.sendFile('index.html');
  });
};

export { initStatic };
