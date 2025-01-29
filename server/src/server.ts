import fastify from 'fastify';
import { PrismaClient } from '@prisma/client';
import { env, loggerOptions, validatorOptions } from './configs';
import { AppServices } from './common';
import { registerModules } from './register-modules';
import { registerPlugins } from './register-plugins';

declare module 'fastify' {
  export interface FastifyInstance extends AppServices {
    authenticate: any;
    database: PrismaClient;
  }
}

const app = fastify({
  logger: loggerOptions,
  ajv: validatorOptions,
});

registerPlugins(app);
registerModules(app);

app

const startServer = async () => {
  try {
    await app.listen({ port: env.PORT, host: env.HOST });
  } catch (error: any) {
    app.log.error(error?.message);

    process.exit(1);
  }
};

startServer();
