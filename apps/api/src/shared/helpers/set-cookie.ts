import type { FastifyReply } from 'fastify';
import type { ConfigService } from '~/modules/config/index.js';
import { CookieName, type CookieNameId } from '~/shared/index.js';

type Options = {
  value: string;
  name: CookieNameId;
  maxAge: number;
  configService: ConfigService;
};

export const setCookie = (reply: FastifyReply, options: Options) => {
  const isDevelopment = options.configService.getKey('NODE_ENV') === 'development';

  const cookieName = CookieName[options.name];

  reply.setCookie(cookieName, options.value, {
    httpOnly: true,
    secure: !isDevelopment,
    path: '/',
    sameSite: isDevelopment ? undefined : 'none',
    maxAge: options.maxAge,
  });
};
