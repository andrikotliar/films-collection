import type { FastifyRequest } from 'fastify';
import { CookieName, type CookieNameId } from '~/shared/enums/cookie-name.js';

export const getCookie = (request: FastifyRequest, cookieId: CookieNameId) => {
  const cookieName = CookieName[cookieId];

  return request.cookies[cookieName];
};
