import { FastifyReply } from 'fastify';
import { CookieName, CookieNameId } from '~/shared/index.js';

type Cookies = CookieNameId;

export const clearCookies = (reply: FastifyReply, cookies: Cookies[]) => {
  for (const cookie of cookies) {
    reply.clearCookie(CookieName[cookie]);
  }
};
