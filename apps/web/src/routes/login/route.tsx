import { createFileRoute, redirect } from '@tanstack/react-router';
import { LoginForm, LoginLayout } from './-components';
import z from 'zod';
import { api, getAuthStateQueryOptions } from '~/shared';

const SearchParamsSchema = z.object({
  from: z.string().optional(),
});

export const Route = createFileRoute('/login')({
  validateSearch: (search: z.infer<typeof SearchParamsSchema>) => {
    return SearchParamsSchema.parse(search);
  },
  loaderDeps: ({ search }) => search,
  beforeLoad: async ({ context: { queryClient } }) => {
    try {
      await queryClient.fetchQuery(getAuthStateQueryOptions());
    } catch {
      queryClient.removeQueries({ queryKey: [api.auth.getState.staticKey] });
      return;
    }
    throw redirect({ to: '/console' });
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
