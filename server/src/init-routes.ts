import { FastifyInstance } from 'fastify';
import { registerFilmsRouter } from './films/films.router';
import { registerInitialDataRouter } from './initial-data/initial-data.router';

const initRoutes = (app: FastifyInstance) => {
  app.register(
    (instance, _, done) => {
      registerFilmsRouter(instance);
      registerInitialDataRouter(instance);

      done();
    },
    { prefix: '/api' },
  );
};

export { initRoutes };
