import { FastifyReply } from 'fastify';
import { CookieName, CookieNameId, env } from 'src/common';

type Options = {
  value: string;
  name: CookieNameId;
  maxAge: number;
};

export const setCookies = (reply: FastifyReply, options: Options[]) => {
  const isDevelopment = env.NODE_ENV === 'development';

  for (const cookieOption of options) {
    const cookieName = CookieName[cookieOption.name];

    reply.setCookie(cookieName, cookieOption.value, {
      httpOnly: true,
      secure: !isDevelopment,
      path: '/',
      sameSite: isDevelopment ? undefined : 'none',
      maxAge: cookieOption.maxAge,
    });
  }
};
