import { STATUS_CODES } from 'http';
import { ErrorCode, ResponseCode } from '../enums';
import { FastifyReply } from 'fastify';

type ErrorPayload = {
  statusCode: ResponseCode;
  code: ErrorCode;
  message: string;
};

export const sendErrorResponse = (
  reply: FastifyReply,
  payload: ErrorPayload,
) => {
  return reply.status(payload.statusCode).send({
    ...payload,
    error: STATUS_CODES[payload.statusCode] ?? 'Bad Request',
  });
};
