import { type AuthResponse, type LoginPayload, apiClient } from '~/shared';

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
