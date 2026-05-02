import { Logo, Form, CenteredBlock, api, type Input } from '~/shared';
import { LogInIcon } from 'lucide-react';
import { LoginSchema } from '@films-collection/shared';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const defaultLoginValues: Input<typeof api.auth.login.exec> = {
  username: '',
  password: '',
};

export const LoginForm = () => {
  const search = useSearch({ from: '/login' });
  const queryClient = useQueryClient();

  const navigate = useNavigate();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (input: Parameters<typeof api.auth.login.exec>[0]['input']) => {
      return api.auth.login.exec({ input });
    },
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: [api.films.getDashboard.staticKey] });
      if (result.id) {
        if (search.from && search.from.includes('console')) {
          navigate({ to: search.from, replace: true });
          return;
        }

        navigate({ to: '/console', replace: true });
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
      <Form.PasswordInput name="password" label="Password" />
    </Form>
  );
};
