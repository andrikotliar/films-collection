import {
  FormPasswordInput,
  Logo,
  Form,
  CenteredBlock,
  useLogin,
  type api,
  type ExtractInputParams,
} from '~/shared';
import { LogInIcon } from 'lucide-react';
import { LoginSchema } from '@films-collection/shared';

const defaultLoginValues: ExtractInputParams<typeof api.auth.login.create> = {
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
      schema={LoginSchema}
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
