import { LocalStorage } from '~/shared/services/local-storage';
import { redirect } from '@tanstack/react-router';
import { createFetchWrapper, HttpError } from '@films-collection/fetch-wrapper';
import type { ErrorCode } from '@films-collection/shared';
import { createApi, keys } from '~/generated';

const TOKEN_ERRORS: Extract<ErrorCode, 'TOKEN_EXPIRED' | 'TOKEN_MISSED'>[] = [
  'TOKEN_EXPIRED',
  'TOKEN_MISSED',
];

export const fetchWrapper = createFetchWrapper({
  baseUrl: '/api',
  onError: async (error, originalRequest) => {
    if (error.response?.statusCode === 401) {
      try {
        if (!TOKEN_ERRORS.includes(error.response?.code)) {
          throw new HttpError(error.response.status, error.response.statusText, error.response);
        }

        const res = await fetch('/auth/refresh', {
          method: 'POST',
          credentials: 'include',
        });

        if (!res.ok) {
          throw new HttpError(401, 'Unauthorized', res);
        }

        return originalRequest();
      } catch (_error) {
        if (!window.location.pathname.includes('login')) {
          LocalStorage.removeItem('authenticated');
          throw redirect({ to: '/login' });
        }
      }
    }

    throw new HttpError(
      error.response?.statusCode,
      error.response?.message ?? 'Unknown error',
      error.response,
    );
  },
});

export const api = createApi(fetchWrapper);
export const queryKeys = keys;
