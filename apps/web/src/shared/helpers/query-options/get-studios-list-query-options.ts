import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { api } from '~/shared/services';

export const getStudiosListQueryOptions = () => {
  return queryOptions({
    queryKey: [api.studios.getList.staticKey],
    queryFn: () => api.studios.getList.exec(),
  });
};

export const useSuspenseStudiosList = () => {
  return useSuspenseQuery(getStudiosListQueryOptions());
};
