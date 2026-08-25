import type { FastifyReply, FastifyRequest } from 'fastify';
import type { VerifiedTokenData } from '~/modules/auth/types.js';
import { CookieName } from '~/shared/enums/cookie-name.js';
import { UnauthorizedException } from '~/shared/exceptions/unauthorized.js';

export const validateAuth = async (request: FastifyRequest, reply: FastifyReply) => {
  const cookiesService = request.server.resolve('cookiesService');

  const token = cookiesService.getCookieFromRequest(request, 'ACCESS_TOKEN');
  const sessionId = cookiesService.getCookieFromRequest(request, 'SESSION_ID');

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

  const userSession = await request.server
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
