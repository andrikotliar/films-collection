import { InitialDataApi } from '~/api';
import { queryKeys } from '~/shared';
import { queryOptions } from '@tanstack/react-query';

export const fetchInitialDataQuery = () => {
  return queryOptions({
    queryKey: [queryKeys.initialData.config],
    queryFn: InitialDataApi.getInitialData,
    staleTime: Infinity,
  });
};
