import { LocalStorage } from '@/services';

export const getAuthState = () => {
  const authState = LocalStorage.getItem<boolean>('authenticated');

  return authState;
};
