import { AuthenticationApi } from '@/api';
import { type AuthResponse, type LoginPayload } from '@/common';
import { LocalStorage, type HttpError } from '@/services';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';

export const useLogin = () => {
  const navigate = useNavigate();
  return useMutation<AuthResponse, HttpError, LoginPayload>({
    mutationFn: AuthenticationApi.login,
    onSuccess: (result) => {
      if (result.id) {
        LocalStorage.setItem('auth_exp', result.exp);

        navigate({ to: '/console/pending-films' });
      }
    },
  });
};
