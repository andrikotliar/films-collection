import { queryOptions } from '@tanstack/react-query';
import { api } from '~/shared/services';

export const getCollectionsListQueryOptions = () => {
  return queryOptions({
    queryKey: [api.collections.getList.staticKey],
    queryFn: () => api.collections.getList.exec(),
  });
};
