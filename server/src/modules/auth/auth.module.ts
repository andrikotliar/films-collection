import { FastifyInstance } from 'fastify';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { createAuthRouter } from './auth.router';

export const registerAuthModule = async (app: FastifyInstance) => {
  const authService = new AuthService(app.usersService, app.jwt);
  const authController = new AuthController(authService);

  await app.register(createAuthRouter(authController), { prefix: '/auth' });
};
