import { queryOptions } from '@tanstack/react-query';
import { api, queryKey } from '~/shared/services';

export const buildGetUserDataQueryOptions = () => {
  return queryOptions({
    queryKey: queryKey('users.getUser'),
    queryFn: api.users.getUser,
  });
};

export const buildGetUserSessionsQueryOptions = () => {
  return queryOptions({
    queryKey: queryKey('users.getSessions'),
    queryFn: api.users.getSessions,
  });
};
