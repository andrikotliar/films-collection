import fastify from 'fastify';
import fastifyCors from '@fastify/cors';
import { env } from './config/env';
import { connectDatabase } from './config/database';
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

    await app.listen({ port: env.PORT });

    console.log(`Server listening at http://localhost:${env.PORT}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

startServer();
