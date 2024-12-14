import { FastifyReply } from 'fastify';
import { AuthService } from './auth.service';
import {
  FastifyLoginRequest,
  FastifyRegisterRequest,
  IAuthController,
} from './types';
import { CookieName, getErrorResponse, ResponseCode } from 'src/common';
import { env } from 'src/config';

class AuthController implements IAuthController {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  async login(request: FastifyLoginRequest, reply: FastifyReply) {
    const result = await this.authService.login(request.body);

    if (!result) {
      return reply
        .status(ResponseCode.UNAUTHENTICATED)
        .send(
          getErrorResponse(
            ResponseCode.UNAUTHENTICATED,
            'Incorrect credentials',
          ),
        );
    }

    reply.setCookie(CookieName.ACCESS_TOKEN, result.accessToken, {
      httpOnly: true,
      secure: env.NODE_ENV !== 'development',
      path: '/',
      sameSite: env.NODE_ENV ? undefined : 'none',
    });

    return reply.status(ResponseCode.OK).send({ userId: result.userId });
  }

  async register(request: FastifyRegisterRequest, reply: FastifyReply) {
    const createdUser = await this.authService.register(request.body);

    return reply.status(ResponseCode.CREATED).send(createdUser);
  }
}

export { AuthController };
