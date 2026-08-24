import { authRouter } from '~/modules/auth/auth.router.js';
import { AuthService } from '~/modules/auth/auth.service.js';
import { createApiModule } from '~/shared/helpers/create-api-module.js';

export const AuthModule = createApiModule({
  services: { AuthService },
  router: authRouter,
});
