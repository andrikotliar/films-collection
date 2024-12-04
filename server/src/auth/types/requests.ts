import { FastifyRequest } from 'fastify';

type FastifyLoginRequest = FastifyRequest<{
  Body: {
    username: string;
    password: string;
  };
}>;

type FastifyRegisterRequest = FastifyRequest<{
  Body: {
    username: string;
    password: string;
  };
}>;

export type { FastifyLoginRequest, FastifyRegisterRequest };
