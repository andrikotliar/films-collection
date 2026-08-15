import { queryOptions } from '@tanstack/react-query';
import { api, queryKey } from '~/shared/services';

export const getArticlesBySlugQueryOptions = (slug: string) => {
  return queryOptions({
    queryKey: [queryKey('articles.getBySlug'), slug],
    queryFn: () => api.articles.getBySlug({ params: { slug } }),
  });
};
