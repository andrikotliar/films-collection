import { queryOptions } from '@tanstack/react-query';
import { api } from '~/shared/services';

export const getUserDataQueryOptions = () => {
  return queryOptions({
    queryKey: [api.users.getUser.staticKey],
    queryFn: () => api.users.getUser.exec(),
  });
};
