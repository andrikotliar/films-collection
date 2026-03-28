import { queryOptions } from '@tanstack/react-query';
import { api } from '~/shared/services';

export const getAwardsBaseDataListQueryOptions = () => {
  return queryOptions({
    queryKey: [api.awards.getList.staticKey],
    queryFn: () => api.awards.getList.exec(),
  });
};
