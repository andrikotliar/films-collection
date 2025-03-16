export const CookieName = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
} as const;

export type CookieNameId = keyof typeof CookieName;
