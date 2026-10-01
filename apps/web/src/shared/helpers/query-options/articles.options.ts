import { queryOptions } from '@tanstack/react-query';
import { isNewItem } from '~/shared/helpers/is-new-item';
import { api, queryKey } from '~/shared/services';
import type { MixedId, QueryParams } from '~/shared/types';

export const buildGetArticlesAdminListQueryOptions = (
  queryParams: QueryParams<typeof api.articles.getAdminList>,
) => {
  return queryOptions({
    queryKey: queryKey('articles.getAdminList', queryParams),
    queryFn: () => api.articles.getAdminList({ queryParams }),
  });
};

export const buildGetArticlesBySlugQueryOptions = (slug: string) => {
  return queryOptions({
    queryKey: queryKey('articles.getBySlug', slug),
    queryFn: () => api.articles.getBySlug({ params: { slug } }),
  });
};

export const buildGetArticleByIdQueryOptions = (id: MixedId) => {
  return queryOptions({
    queryKey: queryKey('articles.getById', id),
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
