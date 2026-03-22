import { queryOptions } from '@tanstack/react-query';
import { api } from '~/shared/services';

export const getGenresListQueryOptions = () => {
  return queryOptions({
    queryKey: [api.genres.getList],
    queryFn: () => api.genres.getList.exec(),
  });
};
