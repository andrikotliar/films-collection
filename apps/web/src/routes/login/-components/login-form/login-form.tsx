import {
  FormPasswordInput,
  Logo,
  Form,
  CenteredBlock,
  api,
  type Input,
  LocalStorage,
} from '~/shared';
import { LogInIcon } from 'lucide-react';
import { LoginSchema } from '@films-collection/shared';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { useMutation } from '@tanstack/react-query';

const defaultLoginValues: Input<typeof api.auth.login.create> = {
  username: '',
  password: '',
};

export const LoginForm = () => {
  const search = useSearch({ from: '/login' });

  const navigate = useNavigate();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (input: Parameters<typeof api.auth.login.create>[0]['input']) => {
      return api.auth.login.create({ input });
    },
    onSuccess: (result) => {
      if (result.id) {
        LocalStorage.setItem('authenticated', true);

        if (search.from) {
          navigate({ to: search.from });
          return;
        }

        navigate({ to: '/console' });
      }
    },
  });

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
