import fastify from 'fastify';
import { PrismaClient } from '@prisma/client';
import CorsPlugin from '@fastify/cors';
import CookiePlugin from '@fastify/cookie';
import JwtPlugin from '@fastify/jwt';
import MultipartPlugin from '@fastify/multipart';
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import { AuthPlugin, PrismaPlugin } from 'src/plugins';
import { AppModule } from './app.module';
import { AppDependencies, CookieName, env, errorHandler } from './common';

declare module 'fastify' {
  export interface FastifyInstance extends AppDependencies {
    authenticate: any;
    database: PrismaClient;
  }
}

const app = fastify({
  logger: {
    enabled: env.NODE_ENV === 'development',
    transport: {
      target: '@fastify/one-line-logger',
    },
  },
}).withTypeProvider<TypeBoxTypeProvider>();

app.register(CorsPlugin, {
  origin: env.FRONTEND_ORIGIN,
  credentials: true,
});

app.register(CookiePlugin, {
  secret: env.COOKIE_SECRET,
});

app.register(JwtPlugin, {
  secret: env.AUTH_SECRET,
  cookie: {
    cookieName: CookieName.ACCESS_TOKEN,
    signed: true,
  },
});

app.register(MultipartPlugin, {
  limits: {
    fileSize: 5000000,
    files: 1,
  },
});

app.register(PrismaPlugin);
app.register(AuthPlugin);

app.register(AppModule, { prefix: '/api' });

app.setErrorHandler(errorHandler);

const startServer = async () => {
  try {
    await app.listen({ port: env.PORT, host: env.HOST });
  } catch (error: any) {
    app.log.error(error?.message);

    process.exit(1);
  }
};

startServer();
