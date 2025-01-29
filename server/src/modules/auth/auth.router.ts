import { FastifyInstance } from 'fastify';
import { loginSchema, registerSchema } from './validation';
import { AuthController } from './auth.controller';

export const createAuthRouter = (authController: AuthController) => {
  return async (authModule: FastifyInstance) => {
    authModule.route({
      method: 'POST',
      url: '/login',
      schema: loginSchema,
      handler: authController.login.bind(authController),
    });

    authModule.route({
      method: 'POST',
      url: '/register',
      schema: registerSchema,
      handler: authController.register.bind(authController),
    });

    authModule.route({
      method: 'POST',
      url: '/refresh',
      handler: authController.refreshTokens.bind(authController),
    });
  };
};
