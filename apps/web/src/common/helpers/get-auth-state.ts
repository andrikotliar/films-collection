import { LocalStorage } from '~/common/services';

export const getAuthState = () => {
  const authState = LocalStorage.getItem<boolean>('authenticated');

  return authState;
};
