import { CookieSerializeOptions } from '@fastify/cookie';
import { env } from 'src/config';

const buildCookieParams = (cookieMaxAge: number): CookieSerializeOptions => {
  return {
    httpOnly: true,
    secure: env.NODE_ENV !== 'development',
    path: '/',
    sameSite: env.NODE_ENV === 'development' ? undefined : 'none',
    maxAge: cookieMaxAge,
  };
};

export { buildCookieParams };
