import fastifyPlugin from 'fastify-plugin';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import {
  CookieName,
  AuthTokenPayload,
  getCookie,
  UnauthorizedException,
} from 'src/common';

const authDecorator = async (app: FastifyInstance) => {
  app.decorate(
    'authenticate',
    async function (request: FastifyRequest, reply: FastifyReply) {
      const token = getCookie(request, 'ACCESS_TOKEN');

      if (!token) {
        throw new UnauthorizedException({
          code: 'TOKEN_MISSED',
          message: 'Malformed credentials',
        });
      }

      let payload: AuthTokenPayload;

      try {
        payload = this.jwt.verify<AuthTokenPayload>(token);
      } catch (error: any) {
        if (error?.code === 'FAST_JWT_EXPIRED') {
          reply.clearCookie(CookieName.ACCESS_TOKEN);

          throw new UnauthorizedException({
            code: 'TOKEN_EXPIRED',
          });
        }

        throw new UnauthorizedException();
      }

      const user = await this.usersService.getUser(payload.id);

      if (!user) {
        throw new UnauthorizedException({
          message: 'User not found or not allowed to proceed',
        });
      }
    },
  );
};

export const AuthPlugin = fastifyPlugin(authDecorator, {
  name: 'authentication',
});
