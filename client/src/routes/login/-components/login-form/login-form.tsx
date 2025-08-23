import type { LoginPayload } from '@/common';
import { Button, FormTextInput, FormPasswordInput, Logo, Form, CenteredBlock } from '@/components';
import { useLogin } from '@/hooks';
import { loginFormSchema } from '@/routes/login/-validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { LogInIcon } from 'lucide-react';
import { FormProvider, useForm } from 'react-hook-form';

const defaultLoginValues: LoginPayload = {
  username: '',
  password: '',
};

export const LoginForm = () => {
  const { mutateAsync, isPending } = useLogin();

  const form = useForm<LoginPayload>({
    defaultValues: defaultLoginValues,
    resolver: yupResolver(loginFormSchema),
  });

  return (
    <FormProvider {...form}>
      <Form onSubmit={mutateAsync}>
        <CenteredBlock>
          <Logo width={120} />
        </CenteredBlock>
        <FormTextInput name="username" label="Username" />
        <FormPasswordInput name="password" label="Password" />
        <Button type="submit" icon={<LogInIcon />} isLoading={isPending}>
          Login
        </Button>
      </Form>
    </FormProvider>
  );
};
