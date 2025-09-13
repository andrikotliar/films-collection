import { compare } from 'bcrypt';
import { ACCESS_TOKEN_MAX_AGE_SEC, REFRESH_TOKEN_MAX_AGE_SEC } from 'src/common';
import { UsersService } from 'src/modules/users/users.service';
import { AuthLoginPayload } from './schemas';
import type { VerifiedTokenData } from 'src/modules/auth/types';
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

  async refreshTokens(token: string, jwt: JWT) {
    this.setJwtInstance(jwt);

    const verifiedToken = jwt.verify<VerifiedTokenData>(token);

    if (!verifiedToken) {
      return null;
    }

    const user = await this.usersService.getUser(verifiedToken.id);

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

    return this.usersService.setRefreshToken({ id: decodedToken.id, refreshToken: null });
  }

  private createToken(payload: Record<string, unknown>, expTime: number) {
    if (!this.jwt) {
      throw new JwtInstanceException();
    }

    return this.jwt.sign(payload, { expiresIn: expTime });
  }

  private createAuthTokens(userId: number) {
    const accessToken = this.createToken({ id: userId }, ACCESS_TOKEN_MAX_AGE_SEC);
    const refreshToken = this.createToken({ id: userId }, REFRESH_TOKEN_MAX_AGE_SEC);

    return {
      accessToken,
      refreshToken,
    };
  }

  private setJwtInstance(jwt: JWT) {
    this.jwt = jwt;
  }
}
