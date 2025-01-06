import { ConsoleLayout } from '@/ui';
import { getIsAuthState } from '@/helpers';
import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_console')({
  beforeLoad: () => {
    const isAuth = getIsAuthState();

    console.log({ isAuth });

    if (!isAuth) {
      throw redirect({ to: '/login' });
    }
  },
  component: ConsoleLayout,
});
