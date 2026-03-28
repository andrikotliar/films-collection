import { queryOptions } from '@tanstack/react-query';
import { api } from '~/shared/services';

export const getAuthStateQueryOptions = () => {
  return queryOptions({
    queryKey: [api.auth.getState.staticKey],
    queryFn: () => api.auth.getState.exec(),
  });
};
