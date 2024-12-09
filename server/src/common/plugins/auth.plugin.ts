import { fastifyJwt } from '@fastify/jwt';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { EnvVariables } from '../types';
import { CookieName, ResponseCode, UserRole } from '../enums';
import { getErrorResponse } from '../helpers';
import { UsersService } from 'src/users/users.service';
import { UsersModel } from 'src/users/users.model';
import { AccessTokenPayload } from 'src/auth/types';

declare module 'fastify' {
  export interface FastifyInstance {
    authenticate: any;
  }
}

const replyWithUnauthenticatedError = (reply: FastifyReply) => {
  return reply
    .status(ResponseCode.UNAUTHENTICATED)
    .send(getErrorResponse(ResponseCode.UNAUTHENTICATED, 'Unauthenticated'));
};

const registerAuthPlugin = (fastify: FastifyInstance, env: EnvVariables) => {
  fastify.register(fastifyJwt, {
    secret: env.AUTH_SECRET,
    cookie: {
      cookieName: CookieName.ACCESS_TOKEN,
      signed: true,
    },
  });

  fastify.decorate(
    'authenticate',
    async (request: FastifyRequest, reply: FastifyReply) => {
      const userService = new UsersService(UsersModel);

      try {
        const token = request.cookies[CookieName.ACCESS_TOKEN];

        if (!token) {
          reply.clearCookie(CookieName.ACCESS_TOKEN);
          return replyWithUnauthenticatedError(reply);
        }

        const decoded = fastify.jwt.verify<AccessTokenPayload>(token);

        const user = await userService.getUser(decoded.id);

        if (!user || user.role !== UserRole.ADMIN) {
          return replyWithUnauthenticatedError(reply);
        }

        request.user = user;
      } catch (error: any) {
        request.log.error(`[AUTH MIDDLEWARE ERROR]: ${error?.message}`);
        reply.clearCookie(CookieName.ACCESS_TOKEN);

        return replyWithUnauthenticatedError(reply);
      }
    },
  );
};

export { registerAuthPlugin };
