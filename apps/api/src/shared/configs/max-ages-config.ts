import type { CookieNameId } from '~/shared/enums/cookie-name.js';

export const maxAgesConfig: Record<CookieNameId, number> = {
  ACCESS_TOKEN: 900, // 15 minutes
  REFRESH_TOKEN: 2_592_000, // 7 days
  SESSION_ID: 2_592_000, // 7 days
};
