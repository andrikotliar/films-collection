import { apiClient, type InitialData } from '~/shared';

export const InitialDataApi = {
  getInitialData() {
    return apiClient.get<InitialData>('/initial-data');
  },
};
