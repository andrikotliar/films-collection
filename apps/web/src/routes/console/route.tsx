import { createFileRoute, redirect } from '@tanstack/react-router';
import { ConsoleRootLayout } from '~/routes/console/-shared';
import { getAuthStateQueryOptions } from '~/shared';

export const Route = createFileRoute('/console')({
  beforeLoad: async ({ context: { queryClient } }) => {
    try {
      await queryClient.ensureQueryData(getAuthStateQueryOptions());
    } catch {
      throw redirect({ to: '/login', search: { from: window.location.pathname } });
    }
  },
  component: ConsoleRootLayout,
});
