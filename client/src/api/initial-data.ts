import { apiClient } from '@/services';
import { InitialData } from '@/types';

export const InitialDataApi = {
  getInitialData() {
    return apiClient.get<InitialData>('/initial-data');
  },
};
