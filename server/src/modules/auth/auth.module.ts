import { FastifyInstance } from 'fastify';
import fastifyPlugin from 'fastify-plugin';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthRouter } from 'src/modules/auth/auth.router';

export const AuthModule = fastifyPlugin(
  async (app: FastifyInstance) => {
    app.decorate('authService', new AuthService(app.usersService, app.jwt));
    app.decorate('authController', new AuthController());

    app.register(AuthRouter, {
      prefix: '/auth',
    });
  },
  { name: 'authModule' },
);
