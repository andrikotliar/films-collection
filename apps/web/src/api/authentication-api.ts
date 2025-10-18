import { apiClient } from '~/services';
import type { AuthResponse, LoginPayload } from '~/common';

export const AuthenticationApi = {
  login(payload: LoginPayload) {
    return apiClient.post<AuthResponse>('/auth/login', {
      payload,
    });
  },

  logout() {
    return apiClient.post('/auth/logout');
  },
};
