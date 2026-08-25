import { compare } from 'bcrypt';
import type { LoginInput } from '@films-collection/shared';
import type { VerifiedTokenData } from '~/modules/auth/types.js';
import type { Deps } from '~/shared/types/deps.js';
import { getDeviceInfo } from '~/shared/helpers/get-device-info.js';
import { maxAgesConfig } from '~/shared/configs/max-ages-config.js';

export class AuthService {
  constructor(private readonly deps: Deps<'usersService' | 'jwt'>) {}

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

    const deviceInfo = getDeviceInfo(userAgent);

    const { sessionId } = await this.deps.usersService.createUserSession({
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
      verifiedToken = this.deps.jwt.verify<VerifiedTokenData>(token);
    } catch {
      await this.deps.usersService.deleteSession(sessionId);
      return null;
    }

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
    const decodedToken = this.deps.jwt.decode<VerifiedTokenData>(token);

    if (!decodedToken) {
      return null;
    }

    return this.deps.usersService.deleteSession(sessionId);
  }

  private createToken(payload: Record<string, unknown>, expTime: number) {
    return this.deps.jwt.sign(payload, { expiresIn: expTime });
  }

  private createAuthTokens(userId: number) {
    const accessToken = this.createToken({ id: userId }, maxAgesConfig.access_token);
    const refreshToken = this.createToken({ id: userId }, maxAgesConfig.refresh_token);

    return {
      accessToken,
      refreshToken,
    };
  }
}
