import { InitialDataApi } from '@/api';
import { queryOptions } from '@tanstack/react-query';

export const fetchInitialDataQuery = () => {
  return queryOptions({
    queryKey: ['initial-data'],
    queryFn: InitialDataApi.getInitialData,
    staleTime: Infinity,
  });
};
