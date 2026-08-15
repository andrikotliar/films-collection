import { queryOptions } from '@tanstack/react-query';
import { isNewItem } from '~/shared/helpers/is-new-item';
import { api, queryKey } from '~/shared/services';
import type { MixedId } from '~/shared/types';

export const getArticleByIdQueryOptions = (id: MixedId) => {
  return queryOptions({
    queryKey: [queryKey('articles.getById'), id],
    queryFn: () => {
      if (isNewItem(id)) {
        return null;
      }

      return api.articles.getById({ params: { id } });
    },
    enabled: !!id,
    gcTime: 0,
  });
};
