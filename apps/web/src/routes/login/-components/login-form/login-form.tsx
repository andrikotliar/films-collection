import type { LoginPayload } from '@/common';
import { FormTextInput, FormPasswordInput, Logo, Form, CenteredBlock } from '@/components';
import { useLogin } from '@/hooks';
import { loginFormSchema } from '@/routes/login/-validation';
import { LogInIcon } from 'lucide-react';

const defaultLoginValues: LoginPayload = {
  username: '',
  password: '',
};

export const LoginForm = () => {
  const { mutateAsync, isPending } = useLogin();

  return (
    <Form
      onSubmit={mutateAsync}
      isLoading={isPending}
      defaultValues={defaultLoginValues}
      schema={loginFormSchema}
      submitIcon={<LogInIcon />}
      submitButtonText="Login"
    >
      <CenteredBlock>
        <Logo width={120} />
      </CenteredBlock>
      <FormTextInput name="username" label="Username" />
      <FormPasswordInput name="password" label="Password" />
    </Form>
  );
};
