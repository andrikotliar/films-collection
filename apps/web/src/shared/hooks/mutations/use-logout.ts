import { api, LocalStorage } from '~/shared';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';

export const useLogout = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: api.auth.logout.create,
    onSuccess: () => {
      LocalStorage.removeItem('authenticated');
      navigate({ to: '/login' });
    },
  });
};
