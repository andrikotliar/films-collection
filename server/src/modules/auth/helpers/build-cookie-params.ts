import { CookieSerializeOptions } from '@fastify/cookie';
import { env } from 'src/configs';

export const buildCookieParams = (
  cookieMaxAge: number,
): CookieSerializeOptions => {
  return {
    httpOnly: true,
    secure: env.NODE_ENV !== 'development',
    path: '/',
    sameSite: env.NODE_ENV === 'development' ? undefined : 'none',
    maxAge: cookieMaxAge,
  };
};
