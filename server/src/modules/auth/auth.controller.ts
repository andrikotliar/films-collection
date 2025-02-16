import { FastifyReply, FastifyRequest } from 'fastify';
import { AuthService } from './auth.service';
import { FastifyLoginRequest, FastifyRegisterRequest } from './types';
import {
  CookieName,
  MAX_AGE_24_HOURS,
  MAX_AGE_7_DAYS,
  ResponseCode,
  sendErrorResponse,
} from 'src/common';

export class AuthController {
  constructor(private authService: AuthService) {}

  async login(request: FastifyLoginRequest, reply: FastifyReply) {
    const result = await this.authService.login(request.body);

    if (!result) {
      return sendErrorResponse(reply, {
        status: 'UNAUTHENTICATED',
        code: 'INCORRECT_CREDENTIALS',
        message: 'Incorrect credentials',
      });
    }

    reply.setCookie(
      CookieName.FC_ACCESS_TOKEN,
      result.accessToken,
      this.authService.buildCookieParams(MAX_AGE_24_HOURS),
    );

    reply.setCookie(
      CookieName.FC_REFRESH_TOKEN,
      result.refreshToken,
      this.authService.buildCookieParams(MAX_AGE_7_DAYS),
    );

    return reply.status(ResponseCode.OK).send({ userId: result.userId });
  }

  async register(request: FastifyRegisterRequest, reply: FastifyReply) {
    const createdUser = await this.authService.register(request.body);

    return reply.status(ResponseCode.CREATED).send(createdUser);
  }

  async refreshTokens(request: FastifyRequest, reply: FastifyReply) {
    const refreshTokenCookie =
      request.cookies[CookieName.FC_REFRESH_TOKEN] ?? null;

    const result = await this.authService.refreshTokens(refreshTokenCookie);

    if (!result) {
      return sendErrorResponse(reply, {
        status: 'UNAUTHENTICATED',
        code: 'INVALID_TOKEN',
        message: 'Unauthenticated',
      });
    }

    reply.setCookie(
      CookieName.FC_ACCESS_TOKEN,
      result.accessToken,
      this.authService.buildCookieParams(MAX_AGE_24_HOURS),
    );

    reply.setCookie(
      CookieName.FC_REFRESH_TOKEN,
      result.refreshToken,
      this.authService.buildCookieParams(MAX_AGE_7_DAYS),
    );

    return reply.status(ResponseCode.OK).send({ userId: result.userId });
  }
}
