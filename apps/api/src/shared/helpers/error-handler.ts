import { Prisma } from '@prisma/client';
import type { FastifyInstance } from 'fastify';
import { ResponseCode } from '../enums';

type PrismaErrorResponse = {
  statusCode: number;
  message: string;
};

const prismaErrorResponse = (error: Prisma.PrismaClientKnownRequestError): PrismaErrorResponse => {
  switch (error.code) {
    case 'P2002':
      return {
        statusCode: ResponseCode.BAD_REQUEST,
        message: `Duplicate field value: ${error.meta?.target}`,
      };
    case 'P2014':
      return {
        statusCode: ResponseCode.BAD_REQUEST,
        message: `Invalid ID: ${error.meta?.target}`,
      };
    case 'P2003':
      return {
        statusCode: ResponseCode.BAD_REQUEST,
        message: `Invalid input data: ${error.meta?.target}`,
      };
    default:
      return {
        statusCode: ResponseCode.SERVER_ERROR,
        message: 'Internal Server Error',
      };
  }
};

export const errorHandler: FastifyInstance['errorHandler'] = (error, request, reply) => {
  request.log.error(error);

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    const response = prismaErrorResponse(error);

    return reply.code(response.statusCode).send(response);
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
