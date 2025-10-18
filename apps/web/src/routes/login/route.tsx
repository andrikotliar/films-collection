import { getAuthState } from '@/common';
import { createFileRoute, redirect } from '@tanstack/react-router';
import { LoginForm, LoginLayout } from './-components';

const LoginContainer = () => {
  return (
    <LoginLayout>
      <LoginForm />
    </LoginLayout>
  );
};

export const Route = createFileRoute('/login')({
  beforeLoad: () => {
    const isAuthenticated = getAuthState();

    if (isAuthenticated) {
      throw redirect({ to: '/console/pending-films' });
    }
  },
  component: LoginContainer,
});
