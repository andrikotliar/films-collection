import type { FastifyReply } from 'fastify';
import { maxAgesConfig } from '~/shared/configs/max-ages-config.js';
import { CookieName, type CookieNameId } from '~/shared/enums/cookie-name.js';
import { SystemErrorException } from '~/shared/exceptions/system-error.js';
import type { Deps } from '~/shared/types/dependencies.js';

export class CookiesService {
  private reply: FastifyReply | null = null;

  constructor(private readonly deps: Deps<'ConfigService'>) {}

  inject(reply: FastifyReply) {
    this.reply = reply;
    return this;
  }

  setCookie(name: CookieNameId, value: string) {
    if (!this.reply) {
      throw new SystemErrorException();
    }

    const isDevelopment = this.deps.ConfigService.getKey('NODE_ENV') === 'development';

    const cookieName = CookieName[name];

    this.reply.setCookie(cookieName, value, {
      httpOnly: true,
      secure: !isDevelopment,
      path: '/',
      sameSite: isDevelopment ? undefined : 'none',
      maxAge: maxAgesConfig[name],
    });
  }
}
