import { FastifyReply } from 'fastify';
import { CookieName, CookieNameId } from 'src/common/enums';
import { env } from 'src/configs';

type Options = {
  value: string;
  cookieId: CookieNameId;
  maxAge: number;
};

export const setCookies = (reply: FastifyReply, options: Options[]) => {
  for (const cookieOption of options) {
    const cookieName = CookieName[cookieOption.cookieId];

    reply.setCookie(cookieName, cookieOption.value, {
      httpOnly: true,
      secure: env.NODE_ENV !== 'development',
      path: '/',
      sameSite: env.NODE_ENV === 'development' ? undefined : 'none',
      maxAge: cookieOption.maxAge,
    });
  }
};
