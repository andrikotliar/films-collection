import { UsersService } from 'src/users/users.service';
import { AuthCredentials, TokenPayload } from './types';
import { compare } from 'bcrypt';
import { UserRole } from 'src/common';
import { JWT, SignOptions } from '@fastify/jwt';
import { ObjectId } from 'mongoose';

export class AuthService {
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

    const { accessToken, refreshToken } = this.createAuthTokens(user._id);

    await this.usersService.setRefreshToken(user._id, refreshToken);

    return {
      accessToken,
      refreshToken,
      userId: user._id,
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

    const { accessToken, refreshToken } = this.createAuthTokens(user._id);

    await this.usersService.setRefreshToken(user._id, refreshToken);

    return {
      accessToken,
      refreshToken,
      userId: user._id,
    };
  }

  register(payload: AuthCredentials) {
    return this.usersService.createUser(payload);
  }

  private createAuthTokens(userId: ObjectId) {
    const accessToken = this.createToken({ id: userId }, '60s');
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
