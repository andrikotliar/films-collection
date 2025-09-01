import { compare } from 'bcrypt';
import { ACCESS_TOKEN_MAX_AGE_SEC, REFRESH_TOKEN_MAX_AGE_SEC, TIME_1_MIN } from 'src/common';
import { UsersService } from 'src/modules/users/users.service';
import { AuthLoginPayload } from './schemas';
import type {
  AuthTokens,
  AuthTokensResponse,
  VerificationResult,
  VerifiedTokenData,
} from 'src/modules/auth/types';
import type { JWT } from '@fastify/jwt';
import { JwtInstanceException } from 'src/modules/auth/exceptions';

export class AuthService {
  private jwt: JWT | null;

  constructor(private readonly usersService: UsersService) {
    this.jwt = null;
  }

  async login({ username, password }: AuthLoginPayload, jwt: JWT) {
    this.setJwtInstance(jwt);

    const user = await this.usersService.getUserByUsername(username);
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

  private verifyToken(token: string): VerificationResult {
    if (!this.jwt) {
      throw new JwtInstanceException();
    }

    try {
      const data = this.jwt.verify<VerifiedTokenData>(token);

      return {
        status: 'success',
        data,
        token,
      };
    } catch (error: any) {
      if (error.code === 'FAST_JWT_EXPIRED') {
        return {
          status: 'error',
          errorType: 'expired',
        };
      }

      return {
        status: 'error',
        errorType: 'unauthorized',
      };
    }
  }

  async checkAuthStatus(tokens: Partial<AuthTokens>, jwt: JWT): Promise<AuthTokensResponse | null> {
    this.setJwtInstance(jwt);

    if (!tokens.accessToken) {
      return this.refreshTokens(tokens.refreshToken);
    }

    const accessTokenResult = this.verifyToken(tokens.accessToken);

    if (accessTokenResult.status === 'success') {
      const shouldRefreshToken = this.checkShouldRefreshToken(accessTokenResult.data.ext);

      if (!shouldRefreshToken) {
        return {
          id: accessTokenResult.data.id,
          newTokens: null,
        };
      }

      return this.refreshTokens(tokens.refreshToken);
    }

    if (accessTokenResult.errorType === 'unauthorized' || !tokens.refreshToken) {
      return null;
    }

    return await this.refreshTokens(tokens.refreshToken);
  }

  private async refreshTokens(token?: string) {
    if (!token) {
      return null;
    }

    const refreshTokenResult = this.verifyToken(token);

    if (refreshTokenResult.status === 'error') {
      return null;
    }

    const user = await this.usersService.getUser(refreshTokenResult.data.id);

    if (!user) {
      return null;
    }

    const isTokensMatched = refreshTokenResult.token === user.refreshToken;

    if (!isTokensMatched) {
      return null;
    }

    const { accessToken, refreshToken } = this.createAuthTokens(user.id);

    return {
      id: user.id,
      newTokens: {
        accessToken: accessToken,
        refreshToken: refreshToken,
      },
    };
  }

  logout(token: string, jwt: JWT) {
    const decodedToken = jwt.decode<VerifiedTokenData>(token);

    if (!decodedToken) {
      return null;
    }

    return this.usersService.setRefreshToken({ id: decodedToken.id, refreshToken: null });
  }

  private createToken(payload: Record<string, unknown>, expTime: number) {
    if (!this.jwt) {
      throw new JwtInstanceException();
    }

    return this.jwt.sign(payload, { expiresIn: expTime });
  }

  private createAuthTokens(userId: number) {
    const accessToken = this.createToken({ id: userId }, ACCESS_TOKEN_MAX_AGE_SEC * 1000);
    const refreshToken = this.createToken({ id: userId }, REFRESH_TOKEN_MAX_AGE_SEC * 1000);

    return {
      accessToken,
      refreshToken,
    };
  }

  private checkShouldRefreshToken(expTimeSec: number) {
    const now = Date.now();
    const expirationMs = expTimeSec * 1000;
    const timeLeft = expirationMs - now;

    return timeLeft <= TIME_1_MIN;
  }

  private setJwtInstance(jwt: JWT) {
    this.jwt = jwt;
  }
}
