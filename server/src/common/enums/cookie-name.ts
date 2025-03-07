export const CookieName = {
  FC_ACCESS_TOKEN: 'fc_access_token',
  FC_REFRESH_TOKEN: 'fc_refresh_token',
} as const;

export type CookieNameId = keyof typeof CookieName;
