import { LocalStorageKey } from '@/enums';
import { useNavigate } from '@tanstack/react-router';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoginForm, LoginLayout } from './components';
import { useMutation } from '@tanstack/react-query';
import { apiClient, HttpError } from '@/services';
import { AuthResponse } from '@/types';
import { ErrorMessage } from '@/components';
import { loginFormSchema } from './validation';

type FormValues = {
  username: string;
  password: string;
};

const defaultLoginValues: FormValues = {
  username: '',
  password: '',
};

export const LoginPage = () => {
  const navigate = useNavigate();

  const { mutate, error } = useMutation<AuthResponse, HttpError, FormValues>({
    mutationFn: (payload) => {
      return apiClient.post('/auth/login', {
        payload,
      });
    },
    onSuccess: (result) => {
      if (result.userId) {
        localStorage.setItem(LocalStorageKey.IS_AUTHENTICATED, 'true');

        navigate({ to: '/console/pending' });
      }
    },
  });

  const methods = useForm<FormValues>({
    defaultValues: defaultLoginValues,
    resolver: yupResolver(loginFormSchema),
  });

  const handleLogin = (values: FormValues) => {
    mutate(values);
  };

  return (
    <FormProvider {...methods}>
      <LoginLayout>
        <LoginForm onSubmit={methods.handleSubmit(handleLogin)} />
      </LoginLayout>
      <ErrorMessage error={error} />
    </FormProvider>
  );
};
