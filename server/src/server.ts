import fastify from 'fastify';
import { PrismaClient } from '@prisma/client';
import CorsPlugin from '@fastify/cors';
import CookiePlugin from '@fastify/cookie';
import JwtPlugin from '@fastify/jwt';
import { AuthPlugin, PrismaPlugin } from 'src/plugins';
import { AppModule } from './app.module';
import { AppDependencies, CookieName } from './common';
import { env, loggerOptions, validatorOptions } from './configs';

declare global {
  interface BigInt {
    toJSON(): string;
  }
}

declare module 'fastify' {
  export interface FastifyInstance extends AppDependencies {
    authenticate: any;
    database: PrismaClient;
  }
}

const app = fastify({
  logger: loggerOptions,
  ajv: validatorOptions,
});

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
    cookieName: CookieName.FC_ACCESS_TOKEN,
    signed: true,
  },
});

app.register(PrismaPlugin);
app.register(AuthPlugin);

app.register(AppModule, { prefix: '/api' });

BigInt.prototype.toJSON = function () {
  return this.toString();
};

const startServer = async () => {
  try {
    await app.listen({ port: env.PORT, host: env.HOST });
  } catch (error: any) {
    app.log.error(error?.message);

    process.exit(1);
  }
};

startServer();
