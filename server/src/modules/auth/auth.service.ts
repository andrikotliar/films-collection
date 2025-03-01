import { JWT } from '@fastify/jwt';
import { compare } from 'bcrypt';
import { UsersService } from 'src/modules/users/users.service';
import {
  AuthLoginPayload,
  AuthRegisterPayload,
} from 'src/modules/auth/schemas';
import { AuthTokenPayload } from './types';

export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JWT) {}

  async login({ username, password }: AuthLoginPayload) {
    const user = await this.usersService.getUserByUsername(username);

    if (!user) {
      return null;
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      return null;
    }

    const { accessToken, refreshToken } = this.createAuthTokens(user.id);

    await this.usersService.setRefreshToken(user.id, refreshToken);

    return {
      accessToken,
      refreshToken,
      userId: user.id,
    };
  }

  async refreshTokens(refreshTokenCookie: string | null) {
    if (!refreshTokenCookie) {
      return null;
    }

    const decodedToken =
      this.jwtService.decode<AuthTokenPayload>(refreshTokenCookie);

    if (!decodedToken) {
      return null;
    }

    const user = await this.usersService.getUser(decodedToken.id);

    if (!user) {
      return null;
    }

    const isTokensMatched = refreshTokenCookie === user.refreshToken;

    if (!isTokensMatched) {
      return null;
    }

    const { accessToken, refreshToken } = this.createAuthTokens(user.id);

    await this.usersService.setRefreshToken(user.id, refreshToken);

    return {
      accessToken,
      refreshToken,
      userId: user.id,
    };
  }

  register(payload: AuthRegisterPayload) {
    return this.usersService.createUser(payload);
  }

  createToken(payload: AuthTokenPayload, expTime: string) {
    return this.jwtService.sign(payload, { expiresIn: expTime });
  }

  createAuthTokens(userId: number) {
    const accessToken = this.createToken({ id: userId }, '24h');
    const refreshToken = this.createToken({ id: userId }, '7d');

    return {
      accessToken,
      refreshToken,
    };
  }
}
