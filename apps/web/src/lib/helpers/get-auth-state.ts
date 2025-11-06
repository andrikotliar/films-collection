import { LocalStorage } from '~/lib/services';

export const getAuthState = () => {
  const authState = LocalStorage.getItem<boolean>('authenticated');

  return authState;
};
