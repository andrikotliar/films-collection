import { ErrorCode, ResponseCode } from '../enums';
import { FastifyReply } from 'fastify';

type ErrorPayload = {
  statusCode: ResponseCode;
  error: ErrorCode;
  message: string;
};

export const sendErrorResponse = (
  reply: FastifyReply,
  payload: ErrorPayload,
) => {
  return reply.status(payload.statusCode).send(payload);
};
