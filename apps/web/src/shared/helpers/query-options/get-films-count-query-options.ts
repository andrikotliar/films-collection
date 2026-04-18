import { queryOptions } from '@tanstack/react-query';
import { api } from '~/shared/services';

export const getFilmsCountQueryOptions = () => {
  return queryOptions({
    queryKey: [api.films.getCount.staticKey],
    queryFn: () => api.films.getCount.exec(),
    staleTime: Infinity,
  });
};
