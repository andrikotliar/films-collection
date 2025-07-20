import { FilmsApi, RelatedChaptersFilter } from '@/api';
import { queryOptions } from '@tanstack/react-query';

export const fetchRelatedChaptersQuery = (
  filter: RelatedChaptersFilter,
  isEnabled: boolean,
) => {
  return queryOptions({
    queryKey: ['related-chapters', filter] as const,
    queryFn: ({ queryKey }) => FilmsApi.getRelatedChapters(queryKey[1]),
    enabled: isEnabled,
  });
};
