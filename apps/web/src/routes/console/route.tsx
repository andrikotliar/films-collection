import { getAuthState, ConsoleLayout } from '~/common';
import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/console')({
  beforeLoad: async () => {
    const isAuthenticated = getAuthState();

    if (!isAuthenticated) {
      throw redirect({ to: '/login' });
    }
  },
  component: ConsoleLayout,
});
