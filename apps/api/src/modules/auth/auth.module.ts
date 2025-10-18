import { AuthService } from 'src/modules/auth/auth.service';
import { users } from 'src/modules/users/users.module';

export const auth = new AuthService(users);
