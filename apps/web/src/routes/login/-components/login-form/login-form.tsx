import {
  type LoginPayload,
  FormPasswordInput,
  Logo,
  Form,
  CenteredBlock,
  useLogin,
} from '~/common';
import { loginFormSchema } from '~/routes/login/-validation';
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
      <Form.TextInput name="username" label="Username" />
      <FormPasswordInput name="password" label="Password" />
    </Form>
  );
};
