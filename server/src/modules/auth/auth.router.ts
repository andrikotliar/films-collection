import { FastifyInstance } from 'fastify';
import { AuthLoginSchema, AuthRegisterSchema } from 'src/modules/auth/schemas';

export const AuthRouter = async (authModule: FastifyInstance) => {
  authModule.route({
    method: 'POST',
    url: '/login',
    schema: {
      body: AuthLoginSchema,
    },
    handler: authModule.authController.login,
  });

  authModule.route({
    method: 'POST',
    url: '/register',
    schema: {
      body: AuthRegisterSchema,
    },
    handler: authModule.authController.register,
  });

  authModule.route({
    method: 'POST',
    url: '/refresh',
    handler: authModule.authController.refreshTokens,
  });
};
