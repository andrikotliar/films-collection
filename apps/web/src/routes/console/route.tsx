import { getAuthState } from '~/shared';
import { createFileRoute, redirect } from '@tanstack/react-router';
import { ConsoleRootLayout } from '~/routes/console/-shared';

export const Route = createFileRoute('/console')({
  beforeLoad: async () => {
    const isAuthenticated = getAuthState();

    if (!isAuthenticated) {
      throw redirect({ to: '/login' });
    }
  },
  component: ConsoleRootLayout,
});
