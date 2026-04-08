export const CookieName = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
  SESSION_ID: 'session_id',
} as const;

export type CookieNameId = keyof typeof CookieName;
