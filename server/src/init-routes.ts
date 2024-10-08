import { FastifyInstance } from 'fastify';
import { registerFilmsRouter } from './films/films.router';

const initRoutes = (app: FastifyInstance) => {
  app.register(
    (instance, _, done) => {
      registerFilmsRouter(instance);

      done();
    },
    { prefix: '/api' },
  );
};

export { initRoutes };
