import fastifyPlugin from 'fastify-plugin';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import {
  ACCESS_TOKEN_MAX_AGE_SEC,
  getCookie,
  REFRESH_TOKEN_MAX_AGE_SEC,
  setCookie,
  UnauthorizedException,
} from 'src/common';
import { users } from 'src/modules/users/users.module';
import { auth } from 'src/modules/auth/auth.module';

const authDecorator = async (app: FastifyInstance) => {
  app.decorate('authenticate', async function (request: FastifyRequest, reply: FastifyReply) {
    const result = await auth.checkAuthStatus(
      {
        accessToken: getCookie(request, 'ACCESS_TOKEN'),
        refreshToken: getCookie(request, 'REFRESH_TOKEN'),
      },
      app.jwt,
    );

    if (!result) {
      throw new UnauthorizedException();
    }

    if (!result.newTokens) {
      app.log.info(`User with ID [${result.id}] has valid tokens, proceed!`);
      return;
    }

    await users.setRefreshToken({
      id: result.id,
      refreshToken: result.newTokens.refreshToken,
    });

    setCookie(reply, {
      name: 'ACCESS_TOKEN',
      value: result.newTokens.accessToken,
      maxAge: ACCESS_TOKEN_MAX_AGE_SEC,
    });
    setCookie(reply, {
      name: 'REFRESH_TOKEN',
      value: result.newTokens.refreshToken,
      maxAge: REFRESH_TOKEN_MAX_AGE_SEC,
    });
  });
};

export const AuthPlugin = fastifyPlugin(authDecorator, {
  name: 'authentication',
});
