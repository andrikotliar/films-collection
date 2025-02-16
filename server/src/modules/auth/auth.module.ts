import { FastifyInstance } from 'fastify';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { createAuthRouter } from 'src/modules/auth/auth.router';

export const AuthModule = async (app: FastifyInstance) => {
  const authService = new AuthService(app.usersService, app.jwt);
  const authController = new AuthController(authService);

  app.register(createAuthRouter(authController), {
    prefix: '/auth',
  });
};
