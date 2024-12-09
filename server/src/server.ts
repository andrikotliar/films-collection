import fastify from 'fastify';
import fastifyCors from '@fastify/cors';
import fastifyCookie from '@fastify/cookie';
import { env, connectDatabase } from './config';
import { initRoutes } from './init-routes';
import { registerAuthPlugin } from './common';
import ajvErrors from 'ajv-errors';

const app = fastify({
  logger: env.NODE_ENV === 'development',
  ajv: {
    customOptions: {
      removeAdditional: 'all',
      allErrors: true,
    },
    plugins: [ajvErrors],
  },
});

app.register(fastifyCors, {
  origin: env.FRONTEND_ORIGIN,
  credentials: true,
});

registerAuthPlugin(app, env);

app.register(fastifyCookie, {
  secret: env.COOKIE_SECRET,
});

initRoutes(app);

const startServer = async () => {
  try {
    await connectDatabase(app);

    await app.listen({ port: env.PORT, host: env.HOST });
  } catch (error: any) {
    app.log.error(error?.message);

    process.exit(1);
  }
};

startServer();
