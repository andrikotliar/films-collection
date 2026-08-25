import { CookieName } from '~/shared/enums/cookie-name.js';

export const maxAgesConfig = {
  [CookieName.ACCESS_TOKEN]: 900, // 15 minutes
  [CookieName.REFRESH_TOKEN]: 2_592_000, // 7 days
  [CookieName.SESSION_ID]: 2_592_000, // 7 days
} as const;
