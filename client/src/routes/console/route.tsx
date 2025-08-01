import { ConsoleLayout } from '@/components';
import { getIsAuthState } from '@/common';
import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/console')({
  beforeLoad: () => {
    const isAuth = getIsAuthState();

    if (!isAuth) {
      throw redirect({ to: '/login' });
    }
  },
  component: ConsoleLayout,
});
