import { NEW_ITEM_ID } from '@films-collection/shared';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { api, queryKeys } from '~/shared/services';

export const getAwardQueryOptions = (id: string) => {
  return queryOptions({
    queryKey: queryKeys.awards.get({ params: { id: +id } }),
    queryFn: () => {
      if (id === NEW_ITEM_ID) {
        return null;
      }

      return api.awards.get({ params: { id: +id } });
    },
    enabled: id !== NEW_ITEM_ID,
    gcTime: 0,
  });
};

export const useSuspenseAward = (id: string) => {
  return useSuspenseQuery(getAwardQueryOptions(id));
};
