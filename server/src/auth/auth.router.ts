import { FastifyInstance } from 'fastify';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { UsersModel } from 'src/users/users.model';
import { AuthController } from './auth.controller';
import { loginSchema, registerSchema } from './validation';

export const registerAuthRouter = (app: FastifyInstance) => {
  const usersService = new UsersService(UsersModel);
  const authService = new AuthService(usersService, app.jwt);

  const authController = new AuthController(authService);

  app.route({
    method: 'POST',
    url: '/auth/login',
    schema: loginSchema,
    handler: authController.login.bind(authController),
  });

  app.route({
    method: 'POST',
    url: '/auth/register',
    schema: registerSchema,
    handler: authController.register.bind(authController),
  });

  app.route({
    method: 'POST',
    url: '/auth/refresh',
    handler: authController.refreshTokens.bind(authController),
  });
};
