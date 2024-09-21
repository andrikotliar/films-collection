import fastify from 'fastify';
import { env } from './config/env.js';
import { connectDatabase } from './config/database.js';
import { initRoutes } from './init-routes.js';
import { initStatic } from './init-static.js';

const app = fastify({
  logger: env.NODE_ENV === 'development',
  ajv: {
    customOptions: {
      removeAdditional: 'all',
    },
  },
});

initRoutes(app);
initStatic(app);

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
