import { AuthService } from './auth.service';
import { createAuthRouter } from './auth.router';
import { createModule } from 'src/common';

export const AuthModule = createModule({
  prefix: 'auth',
  service: (app) => {
    const service = new AuthService(app.usersService, app.jwt);
    return service;
  },
  router: createAuthRouter,
});
