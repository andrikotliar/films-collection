import { getFiltersConfig } from '@/configs';
import { apiClient } from '@/services';
import { InitialData } from '@/types';
import { queryOptions } from '@tanstack/react-query';

const fetchInitialDataQuery = () => {
  return queryOptions({
    queryKey: ['initial-data'],
    queryFn: async () => {
      const data = await apiClient.get<InitialData>('/initial-data');

      return getFiltersConfig(data);
    },
    staleTime: Infinity,
  });
};

export { fetchInitialDataQuery };
