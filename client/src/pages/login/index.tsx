import { LocalStorageKey } from '@/enums';
import { useNavigate } from '@tanstack/react-router';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoginForm, LoginLayout } from './components';
import { useMutation } from '@tanstack/react-query';
import { HttpError } from '@/services';
import { AuthResponse, LoginPayload } from '@/types';
import { ErrorMessage } from '@/components';
import { loginFormSchema } from './validation';
import { AuthenticationApi } from '@/api';

const defaultLoginValues: LoginPayload = {
  username: '',
  password: '',
};

export const LoginPage = () => {
  const navigate = useNavigate();

  const { mutate, error, isPending } = useMutation<
    AuthResponse,
    HttpError,
    LoginPayload
  >({
    mutationFn: AuthenticationApi.login,
    onSuccess: (result) => {
      if (result.userId) {
        localStorage.setItem(LocalStorageKey.IS_AUTHENTICATED, 'true');

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
