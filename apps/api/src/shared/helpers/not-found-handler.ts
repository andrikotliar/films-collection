import type { FastifyReply, FastifyRequest } from 'fastify';
import { ResponseCode } from '~/shared/enums/response-code.js';

export const notFoundHandler = (request: FastifyRequest, reply: FastifyReply) => {
  return reply.status(ResponseCode.NOT_FOUND).send({
    status: 'API endpoint not found',
    url: request.url,
  });
};
