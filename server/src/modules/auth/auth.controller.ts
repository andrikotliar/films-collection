import { FastifyReply, FastifyRequest } from 'fastify';
import { AuthService } from './auth.service';
import {
  CookieName,
  MAX_AGE_24_HOURS,
  MAX_AGE_7_DAYS,
  ResponseCode,
  sendErrorResponse,
  setCookies,
} from 'src/common';
import {
  AuthLoginPayload,
  AuthRegisterPayload,
} from 'src/modules/auth/schemas';

export class AuthController {
  authService!: AuthService;

  async login(
    request: FastifyRequest<{ Body: AuthLoginPayload }>,
    reply: FastifyReply,
  ) {
    const result = await this.authService.login(request.body);

    if (!result) {
      return sendErrorResponse(reply, {
        status: 'UNAUTHENTICATED',
        code: 'INCORRECT_CREDENTIALS',
        message: 'Incorrect credentials',
      });
    }

    setCookies(reply, [
      {
        cookieId: 'FC_ACCESS_TOKEN',
        value: result.accessToken,
        maxAge: MAX_AGE_24_HOURS,
      },
      {
        cookieId: 'FC_REFRESH_TOKEN',
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

    setCookies(reply, [
      {
        cookieId: 'FC_ACCESS_TOKEN',
        value: result.accessToken,
        maxAge: MAX_AGE_24_HOURS,
      },
      {
        cookieId: 'FC_REFRESH_TOKEN',
        value: result.refreshToken,
        maxAge: MAX_AGE_7_DAYS,
      },
    ]);

    return reply.status(ResponseCode.OK).send({ userId: result.userId });
  }
}
