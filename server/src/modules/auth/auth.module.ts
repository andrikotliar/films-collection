import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { createModule } from 'src/common';

export const AuthModule = createModule({
  prefix: 'auth',
  service: (app) => {
    const service = new AuthService(app.usersService, app.jwt);
    return service;
  },
  controller: AuthController,
});
