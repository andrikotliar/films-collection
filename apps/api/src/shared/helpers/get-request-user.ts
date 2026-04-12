import type { FastifyRequest } from 'fastify';
import { UnauthorizedException } from '~/shared/exceptions';

export type RequestUser = {
  id: number;
  sessionId: string;
};

export const getRequestUser = (request: FastifyRequest): RequestUser => {
  const user = request.user as RequestUser;

  if (!user.id) {
    throw new UnauthorizedException();
  }

  return user;
};
