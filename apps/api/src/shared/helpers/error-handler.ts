import type { FastifyError, FastifyReply, FastifyRequest } from 'fastify';
import { ResponseCode } from '../enums';
import { DrizzleQueryError } from 'drizzle-orm';

export const errorHandler = (error: FastifyError, _: FastifyRequest, reply: FastifyReply) => {
  // eslint-disable-next-line
  console.error(error);

  if (error instanceof DrizzleQueryError) {
    return reply.code(ResponseCode.BAD_REQUEST).send({
      statusCode: ResponseCode.BAD_REQUEST,
      message: error.cause?.message ?? 'Query error',
    });
  }

  if (!error.statusCode || error.statusCode === ResponseCode.SERVER_ERROR) {
    return reply.code(ResponseCode.SERVER_ERROR).send({
      statusCode: ResponseCode.SERVER_ERROR,
      message: 'Internal Server Error',
    });
  }

  return reply.code(error.statusCode).send({
    code: error.code,
    statusCode: error.statusCode,
    message: error.message,
  });
};
