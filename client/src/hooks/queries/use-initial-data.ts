import { getFiltersConfig } from '@/configs';
import { apiClient } from '@/services';
import { InitialData } from '@/types';
import { useQuery } from '@tanstack/react-query';

const useInitialData = () => {
  return useQuery({
    queryKey: ['initial-data'],
    queryFn: async () => {
      const data = await apiClient.get<InitialData>('/initial-data');

      return getFiltersConfig(data);
    },
    staleTime: Infinity,
  });
};

export { useInitialData };
