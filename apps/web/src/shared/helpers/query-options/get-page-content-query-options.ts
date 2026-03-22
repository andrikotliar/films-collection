import { queryOptions } from '@tanstack/react-query';
import { isNewItem } from '~/shared/helpers/is-new-item';
import { api } from '~/shared/services';
import type { MixedId } from '~/shared/types';

export const getPageContentByIdQueryOptions = (id: MixedId) => {
  return queryOptions({
    queryKey: [api.pageContent.getById.staticKey, id],
    queryFn: () => {
      if (isNewItem(id)) {
        return null;
      }

      return api.pageContent.getById.exec({ params: { id } });
    },
    enabled: !!id,
    gcTime: 0,
  });
};
