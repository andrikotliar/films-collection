import { LocalStorage } from '@/services';

export const getAuthExpiration = () => {
  const authExpiration = LocalStorage.getItem<string>('auth_exp');

  if (!authExpiration) {
    return null;
  }

  return Number(authExpiration);
};
