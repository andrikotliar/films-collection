import { UsersService } from 'src/modules/users/users.service';
import { AuthCredentials, TokenPayload } from './types';
import { compare } from 'bcrypt';
import { JWT, SignOptions } from '@fastify/jwt';
import { UserRole } from '@prisma/client';

export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JWT) {}

  async login({ username, password }: AuthCredentials) {
    const user = await this.usersService.getUserByUsername(username);

    if (!user || user.role !== UserRole.ADMIN) {
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

  async refreshTokens(refreshTokenCookie?: string) {
    if (!refreshTokenCookie) {
      return null;
    }

    const decodedToken =
      this.jwtService.decode<TokenPayload>(refreshTokenCookie);

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

  register(payload: AuthCredentials) {
    return this.usersService.createUser(payload);
  }

  private createAuthTokens(userId: number) {
    const accessToken = this.createToken({ id: userId }, '24h');
    const refreshToken = this.createToken({ id: userId }, '7d');

    return {
      accessToken,
      refreshToken,
    };
  }

  private createToken(
    payload: TokenPayload,
    expiresIn: SignOptions['expiresIn'],
  ) {
    const token = this.jwtService.sign(payload, {
      expiresIn,
    });

    return token;
  }
}
