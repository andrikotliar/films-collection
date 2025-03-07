import { getIsAuthState } from '@/helpers';
import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/login')({
  beforeLoad: () => {
    const isAuth = getIsAuthState();

    if (isAuth) {
      throw redirect({ to: '/console/pending' });
    }
  },
});
