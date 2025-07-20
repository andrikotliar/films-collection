import { GetPeopleListQueries, PeopleApi } from '@/api';
import { PEOPLE_ADMIN_PER_PAGE } from '../constants';
import { queryOptions } from '@tanstack/react-query';

export type FetchAdminPeopleListParams = {
  page?: number;
  q?: string | null;
  role?: string | null;
};

export const fetchAdminPeopleListQuery = (
  params: FetchAdminPeopleListParams,
) => {
  return queryOptions({
    queryKey: ['people', 'list', params] as const,
    queryFn: ({ queryKey }) => {
      const { page = 0, q, role } = queryKey[2];

      const filters: GetPeopleListQueries = {
        skip: page * PEOPLE_ADMIN_PER_PAGE,
      };

      if (q) {
        filters.q = q;
      }

      if (role) {
        filters.role = role;
      }

      return PeopleApi.getList(filters);
    },
  });
};
