import { PageContentApi } from '~/api';
import { NEW_ITEM_ID } from '../constants';
import { queryOptions } from '@tanstack/react-query';

export const fetchPageContentByIdQuery = (id: string) => {
  return queryOptions({
    queryKey: ['post', 'id', id] as const,
    queryFn: ({ queryKey }) => {
      if (queryKey[2] !== NEW_ITEM_ID) {
        return PageContentApi.getPageContentById(Number(queryKey[2]));
      }

      return null;
    },
    enabled: Boolean(id),
    gcTime: 0,
  });
};
