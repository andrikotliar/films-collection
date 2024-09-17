import fastify from 'fastify';
import { env } from './config/env';
import { connectDatabase } from './config/database';
import { initRoutes } from './init-routes';

const app = fastify({
  logger: env.NODE_ENV === 'development',
});

initRoutes(app);

const startServer = async () => {
  try {
    await connectDatabase(app);

    await app.listen({ port: env.PORT });

    app.log.info(`Server listening at http://localhost:${env.PORT}`);
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
};

startServer();
