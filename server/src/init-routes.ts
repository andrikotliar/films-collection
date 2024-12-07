import { FastifyInstance } from 'fastify';
import { registerFilmsRouter } from './films/films.router';
import { registerInitialDataRouter } from './initial-data/initial-data.router';
import { registerAuthRouter } from './auth/auth.router';
import { registerPendingFilmsRouter } from './pending-films/pending-films.router';

const initRoutes = (app: FastifyInstance) => {
  app.register(
    (instance, _, done) => {
      registerAuthRouter(instance);
      registerFilmsRouter(instance);
      registerInitialDataRouter(instance);
      registerPendingFilmsRouter(instance);

      done();
    },
    { prefix: '/api' },
  );
};

export { initRoutes };
