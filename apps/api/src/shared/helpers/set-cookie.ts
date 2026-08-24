import type { FastifyReply } from 'fastify';
import { CookieName, type CookieNameId } from '~/shared/enums/cookie-name.js';
import type { Inject } from '~/shared/types/inject.js';

type Options = {
  value: string;
  name: CookieNameId;
  maxAge: number;
  deps: Inject<'ConfigService'>;
};

export const setCookie = (reply: FastifyReply, options: Options) => {
  const isDevelopment = options.deps.ConfigService.getKey('NODE_ENV') === 'development';

  const cookieName = CookieName[options.name];

  reply.setCookie(cookieName, options.value, {
    httpOnly: true,
    secure: !isDevelopment,
    path: '/',
    sameSite: isDevelopment ? undefined : 'none',
    maxAge: options.maxAge,
  });
};
