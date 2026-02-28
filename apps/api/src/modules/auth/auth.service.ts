import { compare } from 'bcrypt';
import { ACCESS_TOKEN_MAX_AGE_SEC, REFRESH_TOKEN_MAX_AGE_SEC, type Deps } from '~/shared';
import type { LoginInput } from '@films-collection/shared';
import type { JWT } from '@fastify/jwt';
import type { VerifiedTokenData } from '~/modules/auth/types';

export class AuthService {
  constructor(private readonly deps: Deps<'usersService' | 'jwtService'>) {}

  async login({ username, password }: LoginInput) {
    const user = await this.deps.usersService.getUserByUsername(username);
    if (!user) {
      return null;
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      return null;
    }

    const { accessToken, refreshToken } = this.createAuthTokens(user.id);

    return {
      id: user.id,
      accessToken,
      refreshToken,
    };
  }

  async refreshTokens(token: string) {
    const verifiedToken = this.deps.jwtService.verify<VerifiedTokenData>(token);

    if (!verifiedToken) {
      return null;
    }

    const user = await this.deps.usersService.getUser(verifiedToken.id);

    if (!user) {
      return null;
    }

    const isTokensMatched = token === user.refreshToken;

    if (!isTokensMatched) {
      return null;
    }

    const { accessToken, refreshToken } = this.createAuthTokens(user.id);

    return {
      accessToken,
      refreshToken,
      id: user.id,
    };
  }

  logout(token: string, jwt: JWT) {
    const decodedToken = jwt.decode<VerifiedTokenData>(token);

    if (!decodedToken) {
      return null;
    }

    return this.deps.usersService.setRefreshToken(decodedToken.id, null);
  }

  private createToken(payload: Record<string, unknown>, expTime: number) {
    return this.deps.jwtService.sign(payload, { expiresIn: expTime });
  }

  private createAuthTokens(userId: number) {
    const accessToken = this.createToken({ id: userId }, ACCESS_TOKEN_MAX_AGE_SEC);
    const refreshToken = this.createToken({ id: userId }, REFRESH_TOKEN_MAX_AGE_SEC);

    return {
      accessToken,
      refreshToken,
    };
  }
}
