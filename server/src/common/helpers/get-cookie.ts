import { FastifyRequest } from 'fastify';
import { CookieName, CookieNameId } from '../enums';

export const getCookie = (
  request: FastifyRequest,
  cookieId: CookieNameId,
): string | null => {
  const cookieName = CookieName[cookieId];

  return request.cookies[cookieName] ?? null;
};
