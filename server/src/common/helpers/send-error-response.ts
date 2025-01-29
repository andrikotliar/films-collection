import { STATUS_CODES } from 'http';
import { ErrorCode } from '../types';
import { FastifyReply } from 'fastify';
import { ResponseCode, ResponseStatus } from '../enums';

type ErrorPayload = {
  status: ResponseStatus;
  code: ErrorCode;
  message: string;
};

export const sendErrorResponse = (
  reply: FastifyReply,
  payload: ErrorPayload,
) => {
  const statusCode = ResponseCode[payload.status];

  return reply.status(statusCode).send({
    ...payload,
    error: STATUS_CODES[statusCode] ?? 'Bad Request',
  });
};
