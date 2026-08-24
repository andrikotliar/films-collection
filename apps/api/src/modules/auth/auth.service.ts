import { compare } from 'bcrypt';
import type { LoginInput } from '@films-collection/shared';
import type { VerifiedTokenData } from '~/modules/auth/types.js';
import type { Deps } from '~/shared/types/deps.js';
import { getDeviceInfo } from '~/shared/helpers/get-device-info.js';
import { ACCESS_TOKEN_MAX_AGE_SEC, REFRESH_TOKEN_MAX_AGE_SEC } from '~/shared/constants/index.js';

export class AuthService {
  constructor(private readonly deps: Deps<'UsersService' | 'Jwt'>) {}

  async login({
    username,
    password,
    userAgent,
  }: LoginInput & {
    userAgent?: string;
  }) {
    const user = await this.deps.UsersService.getUserByUsername(username);
    if (!user) {
      return null;
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      return null;
    }

    const { accessToken, refreshToken } = this.createAuthTokens(user.id);

    const deviceInfo = getDeviceInfo(userAgent);

    const { sessionId } = await this.deps.UsersService.createUserSession({
      userId: user.id,
      refreshToken,
      deviceInfo: {
        browser: deviceInfo.browser,
        os: deviceInfo.os,
        device: deviceInfo.device,
      },
    });

    return {
      id: user.id,
      accessToken,
      refreshToken,
      sessionId,
    };
  }

  async refreshTokens(token: string, sessionId: string) {
    let verifiedToken: VerifiedTokenData | null;

    try {
      verifiedToken = this.deps.Jwt.verify<VerifiedTokenData>(token);
    } catch {
      await this.deps.UsersService.deleteSession(sessionId);
      return null;
    }

    if (!verifiedToken) {
      return null;
    }

    const userSession = await this.deps.UsersService.getUserSession(verifiedToken.id, sessionId);

    if (!userSession) {
      return null;
    }

    const isTokensMatched = token === userSession.refreshToken;

    if (!isTokensMatched) {
      return null;
    }

    const { accessToken, refreshToken } = this.createAuthTokens(userSession.userId);

    await this.deps.UsersService.setRefreshToken(verifiedToken.id, sessionId, refreshToken);

    return {
      accessToken,
      refreshToken,
      id: userSession.userId,
    };
  }

  logout(token: string, sessionId: string) {
    const decodedToken = this.deps.Jwt.decode<VerifiedTokenData>(token);

    if (!decodedToken) {
      return null;
    }

    return this.deps.UsersService.deleteSession(sessionId);
  }

  private createToken(payload: Record<string, unknown>, expTime: number) {
    return this.deps.Jwt.sign(payload, { expiresIn: expTime });
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
