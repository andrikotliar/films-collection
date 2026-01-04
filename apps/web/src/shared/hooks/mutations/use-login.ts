import { LocalStorage, api } from '~/shared';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';

export const useLogin = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (input: Parameters<typeof api.auth.login.create>[0]['input']) => {
      return api.auth.login.create({ input });
    },
    onSuccess: (result) => {
      if (result.id) {
        LocalStorage.setItem('authenticated', true);

        navigate({ to: '/console' });
      }
    },
  });
};
