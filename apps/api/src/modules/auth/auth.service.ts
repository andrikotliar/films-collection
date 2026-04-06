import { compare } from 'bcrypt';
import {
  ACCESS_TOKEN_MAX_AGE_SEC,
  getDeviceInfo,
  REFRESH_TOKEN_MAX_AGE_SEC,
  type Deps,
} from '~/shared';
import type { LoginInput } from '@films-collection/shared';
import type { VerifiedTokenData } from '~/modules/auth/types';

export class AuthService {
  constructor(private readonly deps: Deps<'usersService' | 'jwtService'>) {}

  async login({
    username,
    password,
    userAgent,
  }: LoginInput & {
    userAgent?: string;
  }) {
    const user = await this.deps.usersService.getUserByUsername(username);
    if (!user) {
      return null;
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      return null;
    }

    const { accessToken, refreshToken } = this.createAuthTokens(user.id);

    const { sessionId } = await this.deps.usersService.createUserSession({
      userId: user.id,
      refreshToken,
      deviceInfo: getDeviceInfo(userAgent),
    });

    return {
      id: user.id,
      accessToken,
      refreshToken,
      sessionId,
    };
  }

  async refreshTokens(token: string, sessionId: string) {
    const verifiedToken = this.deps.jwtService.verify<VerifiedTokenData>(token);

    if (!verifiedToken) {
      return null;
    }

    const userSession = await this.deps.usersService.getUserSession(verifiedToken.id, sessionId);

    if (!userSession) {
      return null;
    }

    const isTokensMatched = token === userSession.refreshToken;

    if (!isTokensMatched) {
      return null;
    }

    const { accessToken, refreshToken } = this.createAuthTokens(userSession.userId);

    await this.deps.usersService.setRefreshToken(verifiedToken.id, sessionId, refreshToken);

    return {
      accessToken,
      refreshToken,
      id: userSession.userId,
    };
  }

  logout(token: string, sessionId: string) {
    const decodedToken = this.deps.jwtService.decode<VerifiedTokenData>(token);

    if (!decodedToken) {
      return null;
    }

    return this.deps.usersService.deleteSession(decodedToken.id, sessionId);
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
