import { AuthService } from '~/modules/auth/auth.service';
import { users } from '~/modules/users/users.module';

export const auth = new AuthService(users);
