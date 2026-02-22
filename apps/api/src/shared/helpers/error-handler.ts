import type { FastifyInstance } from 'fastify';
import { ResponseCode } from '../enums';
import { UploadingError } from '~/shared/exceptions';
import { DrizzleQueryError } from 'drizzle-orm';

export const errorHandler: FastifyInstance['errorHandler'] = (error, _, reply) => {
  // eslint-disable-next-line
  console.error(error);

  if (error instanceof UploadingError) {
    return reply.code(error.statusCode).send({
      code: error.name,
      statusCode: error.statusCode,
      message: error.message,
    });
  }

  if (error instanceof DrizzleQueryError) {
    return reply.code(ResponseCode.BAD_REQUEST).send(error.message);
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
