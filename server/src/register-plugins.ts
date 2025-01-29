import fastifyCors from '@fastify/cors';
import { FastifyInstance } from 'fastify';
import fastifyCookie from '@fastify/cookie';
import fastifyJwt from '@fastify/jwt';
import { env } from './configs';
import { CookieName } from './common';
import { authPlugin, prismaPlugin } from './plugins';

export const registerPlugins = async (app: FastifyInstance) => {
  app.register(fastifyCors, {
    origin: env.FRONTEND_ORIGIN,
    credentials: true,
  });

  app.register(fastifyCookie, {
    secret: env.COOKIE_SECRET,
  });

  app.register(fastifyJwt, {
    secret: env.AUTH_SECRET,
    cookie: {
      cookieName: CookieName.ACCESS_TOKEN,
      signed: true,
    },
  });

  app.register(prismaPlugin);
  app.register(authPlugin);
};
