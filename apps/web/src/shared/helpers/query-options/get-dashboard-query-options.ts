import { queryOptions } from '@tanstack/react-query';
import { api } from '~/shared/services';

export const getDashboardQueryOptions = () => {
  return queryOptions({
    queryKey: [api.films.getDashboard.staticKey],
    queryFn: () => api.films.getDashboard.exec(),
    staleTime: Infinity,
  });
};
