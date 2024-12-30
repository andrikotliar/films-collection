import { FastifyRequest } from 'fastify';

export type FastifyLoginRequest = FastifyRequest<{
  Body: {
    username: string;
    password: string;
  };
}>;

export type FastifyRegisterRequest = FastifyRequest<{
  Body: {
    username: string;
    password: string;
  };
}>;
