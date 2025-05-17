import { JWT } from '@fastify/jwt';
import { compare } from 'bcrypt';
import { AuthTokenPayload } from 'src/common';
import { UsersService } from 'src/modules/users/users.service';
import { AuthLoginPayload, AuthRegisterInput } from './schemas';

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

  async refreshTokens(token: string) {
    const decodedToken = this.jwtService.decode<AuthTokenPayload>(token);

    if (!decodedToken) {
      return null;
    }

    const user = await this.usersService.getUser(decodedToken.id);

    if (!user) {
      return null;
    }

    const isTokensMatched = token === user.refreshToken;

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

  register(input: AuthRegisterInput) {
    return this.usersService.createUser(input);
  }

  logout(token: string) {
    const decodedToken = this.jwtService.decode<AuthTokenPayload>(token);

    if (!decodedToken) {
      return null;
    }

    return this.usersService.setRefreshToken(decodedToken.id, null);
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
