import { queryOptions } from '@tanstack/react-query';
import { api } from '~/shared/services';

export const getUserSessionsQueryOptions = () => {
  return queryOptions({
    queryKey: [api.users.getSessions.staticKey],
    queryFn: () => api.users.getSessions.exec(),
  });
};
