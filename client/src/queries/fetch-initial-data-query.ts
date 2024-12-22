import { InitialDataApi } from '@/api';
import { getFiltersConfig } from '@/configs';
import { queryOptions } from '@tanstack/react-query';

export const fetchInitialDataQuery = () => {
  return queryOptions({
    queryKey: ['initial-data'],
    queryFn: async () => {
      const data = await InitialDataApi.getInitialData();

      return getFiltersConfig(data);
    },
    staleTime: Infinity,
  });
};
