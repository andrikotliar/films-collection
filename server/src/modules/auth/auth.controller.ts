import { FastifyReply, FastifyRequest } from 'fastify';
import { AuthService } from './auth.service';
import { FastifyLoginRequest, FastifyRegisterRequest } from './types';
import {
  CookieName,
  ErrorCode,
  MAX_AGE_24_HOURS,
  MAX_AGE_7_DAYS,
  ResponseCode,
  sendErrorResponse,
} from 'src/common';
import { buildCookieParams } from './helpers';

export class AuthController {
  constructor(private authService: AuthService) {}

  async login(request: FastifyLoginRequest, reply: FastifyReply) {
    const result = await this.authService.login(request.body);

    if (!result) {
      return sendErrorResponse(reply, {
        statusCode: ResponseCode.UNAUTHENTICATED,
        code: ErrorCode.INCORRECT_CREDENTIALS,
        message: 'Incorrect credentials',
      });
    }

    reply.setCookie(
      CookieName.ACCESS_TOKEN,
      result.accessToken,
      buildCookieParams(MAX_AGE_24_HOURS),
    );

    reply.setCookie(
      CookieName.REFRESH_TOKEN,
      result.refreshToken,
      buildCookieParams(MAX_AGE_7_DAYS),
    );

    return reply.status(ResponseCode.OK).send({ userId: result.userId });
  }

  async register(request: FastifyRegisterRequest, reply: FastifyReply) {
    const createdUser = await this.authService.register(request.body);

    return reply.status(ResponseCode.CREATED).send(createdUser);
  }

  async refreshTokens(request: FastifyRequest, reply: FastifyReply) {
    const refreshTokenCookie = request.cookies[CookieName.REFRESH_TOKEN];

    const result = await this.authService.refreshTokens(refreshTokenCookie);

    if (!result) {
      return sendErrorResponse(reply, {
        statusCode: ResponseCode.UNAUTHENTICATED,
        code: ErrorCode.INVALID_TOKEN,
        message: 'Unauthenticated',
      });
    }

    reply.setCookie(
      CookieName.ACCESS_TOKEN,
      result.accessToken,
      buildCookieParams(MAX_AGE_24_HOURS),
    );

    reply.setCookie(
      CookieName.REFRESH_TOKEN,
      result.refreshToken,
      buildCookieParams(MAX_AGE_7_DAYS),
    );

    return reply.status(ResponseCode.OK).send({ userId: result.userId });
  }
}
