import { FastifyReply, FastifyRequest } from 'fastify';
import { AuthService } from './auth.service';
import {
  clearCookies,
  getCookie,
  MAX_AGE_24_HOURS,
  MAX_AGE_7_DAYS,
  ResponseCode,
  setCookies,
  UnauthorizedException,
} from 'src/common';
import { AuthLoginPayload, AuthRegisterPayload } from './schemas';

export class AuthController {
  authService!: AuthService;

  async login(
    request: FastifyRequest<{ Body: AuthLoginPayload }>,
    reply: FastifyReply,
  ) {
    const result = await this.authService.login(request.body);

    if (!result) {
      throw new UnauthorizedException({
        code: 'INCORRECT_CREDENTIALS',
        message: 'Incorrect credentials',
      });
    }

    setCookies(reply, [
      {
        name: 'ACCESS_TOKEN',
        value: result.accessToken,
        maxAge: MAX_AGE_24_HOURS,
      },
      {
        name: 'REFRESH_TOKEN',
        value: result.refreshToken,
        maxAge: MAX_AGE_7_DAYS,
      },
    ]);

    return reply.status(ResponseCode.OK).send({ userId: result.userId });
  }

  async register(
    request: FastifyRequest<{ Body: AuthRegisterPayload }>,
    reply: FastifyReply,
  ) {
    const createdUser = await this.authService.register(request.body);

    return reply.status(ResponseCode.CREATED).send(createdUser);
  }

  async refreshTokens(request: FastifyRequest, reply: FastifyReply) {
    const token = getCookie(request, 'REFRESH_TOKEN');

    if (!token) {
      throw new UnauthorizedException();
    }

    const result = await this.authService.refreshTokens(token);

    if (!result) {
      throw new UnauthorizedException({
        code: 'INVALID_TOKEN',
      });
    }

    setCookies(reply, [
      {
        name: 'ACCESS_TOKEN',
        value: result.accessToken,
        maxAge: MAX_AGE_24_HOURS,
      },
      {
        name: 'REFRESH_TOKEN',
        value: result.refreshToken,
        maxAge: MAX_AGE_7_DAYS,
      },
    ]);

    return reply.status(ResponseCode.OK).send({ userId: result.userId });
  }

  async logout(request: FastifyRequest, reply: FastifyReply) {
    const accessToken = getCookie(request, 'ACCESS_TOKEN');

    if (accessToken) {
      await this.authService.logout(accessToken);
    }

    clearCookies(reply, ['ACCESS_TOKEN', 'REFRESH_TOKEN']);

    return reply.status(ResponseCode.OK).send({ status: 'ok' });
  }
}
