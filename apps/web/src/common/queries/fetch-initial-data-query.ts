import { InitialDataApi } from '~/api';
import { queryKeys } from '~/common';
import { queryOptions } from '@tanstack/react-query';

export const fetchInitialDataQuery = () => {
  return queryOptions({
    queryKey: [queryKeys.initialData.config],
    queryFn: InitialDataApi.getInitialData,
    staleTime: Infinity,
  });
};
