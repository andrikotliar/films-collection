import path from 'path';
import fastify from 'fastify';
import type { PrismaClient } from '@prisma/client';
import CookiePlugin from '@fastify/cookie';
import JwtPlugin from '@fastify/jwt';
import MultipartPlugin from '@fastify/multipart';
import StaticPlugin from '@fastify/static';
import {
  type ZodTypeProvider,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod';
import { RoutesPlugin, DatabasePlugin, DiContainerPlugin } from '~/plugins';
import { CookieName, errorHandler, notFoundHandler, type DiContainer } from '~/shared';
import { ConfigService } from '~/services/config';

declare module 'fastify' {
  export interface FastifyInstance {
    databaseService: PrismaClient;
    container: DiContainer;
  }
}

const startServer = async () => {
  const app = fastify({
    logger: {
      enabled: process.env.NODE_ENV === 'development',
      transport: {
        target: '@fastify/one-line-logger',
      },
    },
  }).withTypeProvider<ZodTypeProvider>();

  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);

  let configService: ConfigService | null = new ConfigService();

  app.register(CookiePlugin, {
    secret: configService.getKey('COOKIE_SECRET'),
  });

  app.register(JwtPlugin, {
    secret: configService.getKey('AUTH_SECRET'),
    cookie: {
      cookieName: CookieName.ACCESS_TOKEN,
      signed: true,
    },
  });

  app.register(MultipartPlugin, {
    limits: {
      fileSize: 5_000_000,
      files: 1,
    },
  });

  app.register(StaticPlugin, {
    root: path.join(import.meta.dirname, '/public'),
  });

  app.register(RoutesPlugin, { prefix: '/api' });

  app.setErrorHandler(errorHandler);

  app.setNotFoundHandler(notFoundHandler);

  await app.register(DatabasePlugin);
  await app.register(DiContainerPlugin);

  try {
    await app.listen({
      port: configService.getKey('SERVER_PORT'),
      host: configService.getKey('SERVER_HOST'),
    });

    configService = null;
  } catch (error: any) {
    app.log.error(error?.message);

    process.exit(1);
  }
};

startServer();
