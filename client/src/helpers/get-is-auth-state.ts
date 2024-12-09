import { LocalStorageKey } from '@/enums';

export const getIsAuthState = () => {
  const isAuthenticated =
    localStorage.getItem(LocalStorageKey.IS_AUTHENTICATED) === 'true';

  return isAuthenticated;
};
