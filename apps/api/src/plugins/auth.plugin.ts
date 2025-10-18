import fastifyPlugin from 'fastify-plugin';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { CookieName, getCookie, UnauthorizedException } from 'src/common';
import { users } from 'src/modules/users/users.module';
import type { VerifiedTokenData } from 'src/modules/auth/types';

const authDecorator = async (app: FastifyInstance) => {
  app.decorate('authenticate', async function (request: FastifyRequest, reply: FastifyReply) {
    const token = getCookie(request, 'ACCESS_TOKEN');

    if (!token) {
      throw new UnauthorizedException({
        code: 'TOKEN_MISSED',
        message: 'Malformed credentials',
      });
    }

    let payload: VerifiedTokenData;

    try {
      payload = this.jwt.verify<VerifiedTokenData>(token);
    } catch (error: any) {
      if (error?.code === 'FAST_JWT_EXPIRED') {
        reply.clearCookie(CookieName.ACCESS_TOKEN);

        throw new UnauthorizedException({
          code: 'TOKEN_EXPIRED',
        });
      }

      throw new UnauthorizedException();
    }

    const user = await users.getUser(payload.id);

    if (!user) {
      throw new UnauthorizedException({
        message: 'User not found',
      });
    }
  });
};

export const AuthPlugin = fastifyPlugin(authDecorator, {
  name: 'authentication',
});
