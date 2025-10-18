import { AuthenticationApi } from '~/api';
import { LocalStorage } from '~/common';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';

export const useLogout = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: AuthenticationApi.logout,
    onSuccess: () => {
      LocalStorage.removeItem('authenticated');
      navigate({ to: '/login' });
    },
  });
};
