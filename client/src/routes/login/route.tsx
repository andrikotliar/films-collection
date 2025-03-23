import { AuthenticationApi } from '@/api';
import { getIsAuthState } from '@/helpers';
import { HttpError, LocalStorage } from '@/services';
import { AuthResponse, LoginPayload } from '@/types';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router';
import { FormProvider, useForm } from 'react-hook-form';
import { loginFormSchema } from './-validation';
import { LoginForm, LoginLayout } from './-components';
import { ErrorMessage } from '@/ui';

const defaultLoginValues: LoginPayload = {
  username: '',
  password: '',
};

const LoginContainer = () => {
  const navigate = useNavigate();

  const { mutate, error, isPending } = useMutation<
    AuthResponse,
    HttpError,
    LoginPayload
  >({
    mutationFn: AuthenticationApi.login,
    onSuccess: (result) => {
      if (result.userId) {
        LocalStorage.setItem('IS_AUTHENTICATED', true);

        navigate({ to: '/console/pending' });
      }
    },
  });

  const methods = useForm<LoginPayload>({
    defaultValues: defaultLoginValues,
    resolver: yupResolver(loginFormSchema),
  });

  const handleLogin = (values: LoginPayload) => {
    mutate(values);
  };

  return (
    <FormProvider {...methods}>
      <LoginLayout>
        <LoginForm
          onSubmit={methods.handleSubmit(handleLogin)}
          isSaving={isPending}
        />
      </LoginLayout>
      <ErrorMessage error={error} />
    </FormProvider>
  );
};

export const Route = createFileRoute('/login')({
  beforeLoad: () => {
    const isAuth = getIsAuthState();

    if (isAuth) {
      throw redirect({ to: '/console/pending' });
    }
  },
  component: LoginContainer,
});
