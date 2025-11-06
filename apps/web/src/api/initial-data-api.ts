import { apiClient, type InitialData } from '~/lib';

export const InitialDataApi = {
  getInitialData() {
    return apiClient.get<InitialData>('/initial-data');
  },
};
