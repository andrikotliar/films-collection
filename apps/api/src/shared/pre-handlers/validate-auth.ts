import type { FastifyReply, FastifyRequest } from 'fastify';
import type { VerifiedTokenData } from '~/modules/auth';
import { CookieName } from '~/shared/enums';
import { UnauthorizedException } from '~/shared/exceptions';
import { getCookie } from '~/shared/helpers';

export const validateAuth = async (request: FastifyRequest, reply: FastifyReply) => {
  const token = getCookie(request, 'ACCESS_TOKEN');
  const sessionId = getCookie(request, 'SESSION_ID');

  if (!token || !sessionId) {
    request.user = {};

    throw new UnauthorizedException({
      code: 'TOKEN_MISSED',
      message: 'Malformed credentials',
    });
  }

  let payload: VerifiedTokenData;

  try {
    payload = request.server.jwt.verify<VerifiedTokenData>(token);
  } catch (error: any) {
    request.user = {};

    if (error?.code === 'FAST_JWT_EXPIRED') {
      reply.clearCookie(CookieName.ACCESS_TOKEN);

      throw new UnauthorizedException({
        code: 'TOKEN_EXPIRED',
      });
    }

    throw new UnauthorizedException();
  }

  const userSession = await request.server.container
    .resolve('usersService')
    .getUserSession(payload.id, sessionId);

  if (!userSession) {
    request.user = {};

    throw new UnauthorizedException({
      message: 'User not found',
    });
  }

  request.user = {
    id: payload.id,
    sessionId,
  };
};
