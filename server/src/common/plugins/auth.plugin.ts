import { fastifyJwt } from '@fastify/jwt';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { EnvVariables } from '../types';
import { CookieName, ErrorCode, ResponseCode, UserRole } from '../enums';
import { sendErrorResponse } from '../helpers';
import { UsersService } from 'src/users/users.service';
import { UsersModel } from 'src/users/users.model';
import { TokenPayload } from 'src/auth/types';

declare module 'fastify' {
  export interface FastifyInstance {
    authenticate: any;
  }
}

export const registerAuthPlugin = (
  fastify: FastifyInstance,
  env: EnvVariables,
) => {
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
          return sendErrorResponse(reply, {
            statusCode: ResponseCode.UNAUTHENTICATED,
            code: ErrorCode.JWT_EXPIRED,
            message: 'Unauthenticated',
          });
        }

        const decoded = fastify.jwt.verify<TokenPayload>(token);

        const user = await userService.getUser(decoded.id);

        if (!user || user.role !== UserRole.ADMIN) {
          throw new Error('User not found or not allowed to proceed');
        }

        request.user = user;
      } catch (error: any) {
        request.log.error(`[AUTH MIDDLEWARE ERROR]: ${error?.message}`);

        reply.clearCookie(CookieName.ACCESS_TOKEN);

        return sendErrorResponse(reply, {
          statusCode: ResponseCode.UNAUTHENTICATED,
          code:
            error?.code === 'FAST_JWT_EXPIRED'
              ? ErrorCode.JWT_EXPIRED
              : ErrorCode.UNAUTHENTICATED,
          message: 'Unauthenticated',
        });
      }
    },
  );
};
