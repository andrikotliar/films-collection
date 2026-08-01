import { createFileRoute, redirect } from '@tanstack/react-router';
import { LoginForm, LoginLayout } from './-components';
import { z } from 'zod';
import { LOGIN_BLOCK_KEY } from '~/shared';

const SearchParamsSchema = z.object({
  from: z.string().optional(),
});

export const Route = createFileRoute('/login')({
  validateSearch: (search: z.infer<typeof SearchParamsSchema>) => {
    return SearchParamsSchema.parse(search);
  },
  loaderDeps: ({ search }) => search,
  beforeLoad: async () => {
    const isLoginBlocked = localStorage.getItem(LOGIN_BLOCK_KEY) === 'true';

    if (isLoginBlocked) {
      throw redirect({ to: '/console' });
    }
  },
  component: PageContainer,
  head: () => ({ meta: [{ title: 'Login - Films Collection' }] }),
});

function PageContainer() {
  return (
    <LoginLayout>
      <LoginForm />
    </LoginLayout>
  );
}
