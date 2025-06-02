import { AwardsApi } from '@/api';
import { NEW_ITEM_ID } from '@/constants';
import { queryOptions } from '@tanstack/react-query';

export const fetchAwardByIdQuery = (id: string) => {
  return queryOptions({
    queryKey: ['award', id] as const,
    queryFn: ({ queryKey }) => {
      return AwardsApi.getById(+queryKey[1]);
    },
    enabled: id !== NEW_ITEM_ID,
  });
};
