import type { FastifyReply, FastifyRequest } from 'fastify';
import { maxAgesConfig } from '~/shared/configs/max-ages-config.js';
import { CookieName, type CookieNameId } from '~/shared/enums/cookie-name.js';
import { SystemErrorException } from '~/shared/exceptions/system-error.js';
import type { Deps } from '~/shared/types/deps.js';

export class CookiesService {
  private reply: FastifyReply | null = null;

  constructor(private readonly deps: Deps<'configService'>) {}

  inject(reply: FastifyReply) {
    this.reply = reply;
    return this;
  }

  setCookie(name: CookieNameId, value: string) {
    if (!this.reply) {
      throw new SystemErrorException();
    }

    const isDevelopment = this.deps.configService.getKey('NODE_ENV') === 'development';

    const cookieName = CookieName[name];

    this.reply.setCookie(cookieName, value, {
      httpOnly: true,
      secure: !isDevelopment,
      path: '/',
      sameSite: isDevelopment ? undefined : 'none',
      maxAge: maxAgesConfig[cookieName],
    });
  }

  clearCookies(cookieNames: CookieNameId[]) {
    if (!this.reply) {
      throw new SystemErrorException();
    }

    for (const cookie of cookieNames) {
      this.reply.clearCookie(CookieName[cookie]);
    }
  }

  getCookieFromRequest(request: FastifyRequest, name: CookieNameId) {
    const cookieName = CookieName[name];

    return request.cookies[cookieName];
  }
}
