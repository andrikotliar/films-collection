import { LocalStorage } from '@/services';

export const getIsAuthState = () => {
  const isAuthenticated = LocalStorage.getItem<boolean>(
    'state:is_authenticated',
  );

  return isAuthenticated;
};
