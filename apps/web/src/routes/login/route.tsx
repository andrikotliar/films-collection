import { getAuthState } from '~/shared';
import { createFileRoute, redirect } from '@tanstack/react-router';
import { LoginForm, LoginLayout } from './-components';
import z from 'zod';

const SearchParamsSchema = z.object({
  from: z.string().optional(),
});

export const Route = createFileRoute('/login')({
  validateSearch: (search: z.infer<typeof SearchParamsSchema>) => {
    return SearchParamsSchema.parse(search);
  },
  loaderDeps: ({ search }) => search,
  beforeLoad: () => {
    const isAuthenticated = getAuthState();

    if (isAuthenticated) {
      throw redirect({ to: '/console' });
    }
  },
  component: PageContainer,
});

function PageContainer() {
  return (
    <LoginLayout>
      <LoginForm />
    </LoginLayout>
  );
}
