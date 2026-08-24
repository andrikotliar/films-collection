import path from 'path';
import fastify from 'fastify';
import CookiePlugin from '@fastify/cookie';
import JwtPlugin from '@fastify/jwt';
import MultipartPlugin from '@fastify/multipart';
import StaticPlugin from '@fastify/static';
import {
  type ZodTypeProvider,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod';
import {
  RoutesPlugin,
  DatabasePlugin,
  type Database,
  ModulesPlugin,
  DiContainerPlugin,
} from '~/plugins/index.js';
import { ConfigService } from '~/modules/config/config.service.js';
import type { ServiceInstances } from '~/shared/types/dependencies.js';
import { CookieName } from '~/shared/enums/cookie-name.js';
import { errorHandler } from '~/shared/helpers/error-handler.js';
import { notFoundHandler } from '~/shared/helpers/not-found-handler.js';
import { appModule } from '~/modules/app.module.js';

declare module 'fastify' {
  export interface FastifyInstance {
    db: Database;
    services: ServiceInstances;
  }
}

const startServer = async () => {
  const app = fastify({
    logger: {
      transport: {
        target: '@fastify/one-line-logger',
      },
    },
  }).withTypeProvider<ZodTypeProvider>();

  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);

  let configService: ConfigService | null = new ConfigService();

  app.register(ModulesPlugin, { modules: appModule });

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
