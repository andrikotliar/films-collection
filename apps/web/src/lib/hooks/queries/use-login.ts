import { AuthenticationApi } from '~/api';
import { LocalStorage, type AuthResponse, type HttpError, type LoginPayload } from '~/lib';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';

export const useLogin = () => {
  const navigate = useNavigate();
  return useMutation<AuthResponse, HttpError, LoginPayload>({
    mutationFn: AuthenticationApi.login,
    onSuccess: (result) => {
      if (result.id) {
        LocalStorage.setItem('authenticated', true);

        navigate({ to: '/console/pending-films' });
      }
    },
  });
};
