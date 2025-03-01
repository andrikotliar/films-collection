import fastifyPlugin from 'fastify-plugin';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { CookieName } from 'src/common/enums';
import { sendErrorResponse } from 'src/common/helpers';
import { TokenPayload } from 'src/modules/auth/types';

const authDecorator = async (app: FastifyInstance) => {
  app.decorate(
    'authenticate',
    async function (request: FastifyRequest, reply: FastifyReply) {
      try {
        const token = request.cookies[CookieName.FC_ACCESS_TOKEN];

        if (!token) {
          return sendErrorResponse(reply, {
            status: 'UNAUTHENTICATED',
            code: 'TOKEN_MISSED',
            message: 'Malformed credentials',
          });
        }

        const decoded = this.jwt.verify<TokenPayload>(token);

        const user = await this.usersService.getUser(decoded.id);

        if (!user) {
          return sendErrorResponse(reply, {
            status: 'UNAUTHENTICATED',
            code: 'UNAUTHENTICATED',
            message: 'User not found or not allowed to proceed',
          });
        }

        request.user = {
          id: user.id,
        };
      } catch (error: any) {
        request.log.error(`[AUTH MIDDLEWARE ERROR]: ${error?.message}`);

        reply.clearCookie(CookieName.FC_ACCESS_TOKEN);

        return sendErrorResponse(reply, {
          status: 'UNAUTHENTICATED',
          code:
            error?.code === 'FAST_JWT_EXPIRED'
              ? 'TOKEN_EXPIRED'
              : 'UNAUTHENTICATED',
          message: 'Unauthenticated',
        });
      }
    },
  );
};

export const AuthPlugin = fastifyPlugin(authDecorator, {
  name: 'authentication',
});
