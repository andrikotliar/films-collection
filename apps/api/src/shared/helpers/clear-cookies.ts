import type { FastifyReply } from 'fastify';
import { CookieName, type CookieNameId } from '~/shared/enums/cookie-name.js';

type Cookies = CookieNameId;

export const clearCookies = (reply: FastifyReply, cookies: Cookies[]) => {
  for (const cookie of cookies) {
    reply.clearCookie(CookieName[cookie]);
  }
};
