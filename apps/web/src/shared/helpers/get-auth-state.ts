import { LocalStorage } from '~/shared/services';

export const getAuthState = () => {
  const authState = LocalStorage.getItem<boolean>('authenticated');

  return authState;
};
