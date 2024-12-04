import { FastifyInstance } from 'fastify';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { UsersModel } from 'src/users/users.model';
import { AuthController } from './auth.controller';
import { FastifyLoginRequest, FastifyRegisterRequest } from './types';
import { loginSchema, registerSchema } from './validation';

const registerAuthRouter = (app: FastifyInstance) => {
  const usersService = new UsersService(UsersModel);
  const authService = new AuthService(usersService, app.jwt);

  const authController = new AuthController(authService);

  app.route({
    method: 'POST',
    url: '/auth/login',
    schema: loginSchema,
    handler: (request: FastifyLoginRequest, reply) => {
      return authController.login(request, reply);
    },
  });

  app.route({
    method: 'POST',
    url: '/auth/register',
    schema: registerSchema,
    handler: (request: FastifyRegisterRequest, reply) => {
      return authController.register(request, reply);
    },
  });
};

export { registerAuthRouter };
