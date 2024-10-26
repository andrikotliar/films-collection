import fastify from 'fastify';
import fastifyCors from '@fastify/cors';
import { env, connectDatabase } from './config';
import { initRoutes } from './init-routes';

const app = fastify({
  logger: env.NODE_ENV === 'development',
  ajv: {
    customOptions: {
      removeAdditional: 'all',
    },
  },
});

app.register(fastifyCors, {
  origin: env.FRONTEND_ORIGIN,
  credentials: true,
});

initRoutes(app);

const startServer = async () => {
  try {
    await connectDatabase();

    await app.listen({ port: env.PORT, host: env.HOST });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

startServer();
