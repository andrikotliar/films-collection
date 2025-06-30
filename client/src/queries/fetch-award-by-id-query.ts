import { AwardsApi } from '@/api';
import { NEW_ITEM_ID } from '@/constants';
import { queryOptions } from '@tanstack/react-query';

export const fetchAwardByIdQuery = (id: string) => {
  return queryOptions({
    queryKey: ['award', id] as const,
    queryFn: ({ queryKey }) => {
      const awardId = queryKey[1];

      if (awardId === NEW_ITEM_ID) {
        return null;
      }

      return AwardsApi.getById(+queryKey[1]);
    },
    enabled: id !== NEW_ITEM_ID,
    gcTime: 0,
  });
};
