import { redirect } from '@tanstack/react-router';
import { createApiClient, HttpError } from '@films-collection/api-client';
import type { ErrorCode } from '@films-collection/shared';
import { queryClient } from '~/shared/services/query-client';

const TOKEN_ERRORS: Extract<ErrorCode, 'TOKEN_EXPIRED' | 'TOKEN_MISSED'>[] = [
  'TOKEN_EXPIRED',
  'TOKEN_MISSED',
];

let refreshPromise: Promise<void> | null = null;

const refreshToken = async () => {
  if (!refreshPromise) {
    refreshPromise = fetch('/api/auth/refresh', {
      method: 'POST',
      credentials: 'include',
    })
      .then((res) => {
        if (!res.ok) {
          throw new HttpError(401, 'Unauthorized', res);
        }
      })
      .finally(() => {
        refreshPromise = null;
      });
  }

  return refreshPromise;
};

export const api = createApiClient({
  baseUrl: '/api',
  onError: async (error, originalRequest) => {
    if (error.response?.statusCode === 401 && !window.location.pathname.includes('login')) {
      try {
        if (!TOKEN_ERRORS.includes(error.response?.code)) {
          throw new HttpError(error.response.status, error.response.statusText, error.response);
        }

        await refreshToken();

        return originalRequest();
      } catch (_error) {
        queryClient.removeQueries({ queryKey: [api.auth.getState.staticKey] });
        throw redirect({ to: '/login' });
      }
    }

    throw new HttpError(
      error.response?.statusCode,
      error.response?.message ?? 'Unknown error',
      error.response,
    );
  },
});
