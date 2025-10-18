import { apiClient, type InitialData } from '~/common';

export const InitialDataApi = {
  getInitialData() {
    return apiClient.get<InitialData>('/initial-data');
  },
};
