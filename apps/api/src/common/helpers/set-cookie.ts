import { FastifyReply } from 'fastify';
import { CookieName, CookieNameId, env } from 'src/common';

type Options = {
  value: string;
  name: CookieNameId;
  maxAge: number;
};

export const setCookie = (reply: FastifyReply, options: Options) => {
  const isDevelopment = env.NODE_ENV === 'development';

  const cookieName = CookieName[options.name];

  reply.setCookie(cookieName, options.value, {
    httpOnly: true,
    secure: !isDevelopment,
    path: '/',
    sameSite: isDevelopment ? undefined : 'none',
    maxAge: options.maxAge,
  });
};
