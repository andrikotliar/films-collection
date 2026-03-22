import { api } from '~/shared/services';
import { queryOptions } from '@tanstack/react-query';

export const getInitialDataQueryOptions = () => {
  return queryOptions({
    queryKey: [api.initialData.get.staticKey],
    queryFn: () => api.initialData.get.exec(),
    staleTime: Infinity,
  });
};
