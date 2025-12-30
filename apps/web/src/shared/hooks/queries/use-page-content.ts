import { NEW_ITEM_ID } from '@films-collection/shared';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { api, queryKeys } from '~/shared/services';

export const getPageContentByIdQueryOptions = (id: string) => {
  return queryOptions({
    queryKey: queryKeys.pageContent.get({ params: { id: +id } }),
    queryFn: () => {
      if (id !== NEW_ITEM_ID) {
        return api.pageContent.get({ params: { id: +id } });
      }

      return null;
    },
    enabled: Boolean(id),
    gcTime: 0,
  });
};

export const useSuspensePageContent = (id: string) => {
  return useSuspenseQuery(getPageContentByIdQueryOptions(id));
};
