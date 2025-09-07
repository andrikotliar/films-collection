import { ConsoleLayout } from '@/components';
import { getAuthExpiration, type AuthResponse } from '@/common';
import { createFileRoute, redirect } from '@tanstack/react-router';
import { apiClient, LocalStorage } from '@/services';

export const Route = createFileRoute('/console')({
  beforeLoad: async () => {
    const exp = getAuthExpiration();

    if (!exp) {
      throw redirect({ to: '/login' });
    }

    const now = new Date().getTime();

    if (exp - now <= 60_000) {
      const result = await apiClient.post<AuthResponse>('/auth/refresh');

      if (!result.id) {
        throw redirect({ to: '/login' });
      }

      LocalStorage.setItem('auth_exp', result.exp);
    }
  },
  component: ConsoleLayout,
});
