import { LocalStorage } from '@/services';

export const getIsAuthState = () => {
  const isAuthenticated = LocalStorage.getItem<boolean>('IS_AUTHENTICATED');

  return isAuthenticated;
};
