import { UsersService } from 'src/users/users.service';
import { AccessTokenPayload, IAuthService, AuthCredentials } from './types';
import { compare } from 'bcrypt';
import { UserRole } from 'src/common';
import { JWT } from '@fastify/jwt';

class AuthService implements IAuthService {
  private usersService: UsersService;
  private jwtService: JWT;

  constructor(usersService: UsersService, jwtService: JWT) {
    this.usersService = usersService;
    this.jwtService = jwtService;
  }

  async login({ username, password }: AuthCredentials) {
    const user = await this.usersService.getUserByUsername(username);

    if (!user || user.role !== UserRole.ADMIN) {
      return null;
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      return null;
    }

    const accessToken = this.#createAccessToken({ id: user._id });

    return {
      accessToken,
      userId: user._id,
    };
  }

  register(payload: AuthCredentials) {
    return this.usersService.createUser(payload);
  }

  #createAccessToken(payload: AccessTokenPayload) {
    const token = this.jwtService.sign(payload, {
      expiresIn: '5s',
    });

    return token;
  }
}

export { AuthService };
