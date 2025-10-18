import type { FastifyReply, FastifyRequest } from 'fastify';
import { ResponseCode } from 'src/common/enums';

export const notFoundHandler = (request: FastifyRequest, reply: FastifyReply) => {
  if (request.url.startsWith('/api')) {
    return reply.status(ResponseCode.NOT_FOUND).send({
      status: 'API endpoint not found',
      url: request.url,
    });
  }

  reply.sendFile('index.html');
};
