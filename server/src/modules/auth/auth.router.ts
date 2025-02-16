import { RouterCreator } from 'src/common';
import { AuthController } from 'src/modules/auth/auth.controller';
import { authLoginSchema, authRegisterSchema } from 'src/modules/auth/schemas';

export const createAuthRouter: RouterCreator<AuthController> = (controller) => {
  return async (authModule) => {
    authModule.route({
      method: 'POST',
      url: '/login',
      schema: authLoginSchema,
      handler: controller.login.bind(controller),
    });

    authModule.route({
      method: 'POST',
      url: '/register',
      schema: authRegisterSchema,
      handler: controller.register.bind(controller),
    });

    authModule.route({
      method: 'POST',
      url: '/refresh',
      handler: controller.refreshTokens.bind(controller),
    });
  };
};
