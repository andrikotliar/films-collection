import { queryOptions } from '@tanstack/react-query';
import { api } from '~/shared/services';

export const getNominationsByAwardQueryOptions = (awardId: number | null) => {
  return queryOptions({
    queryKey: [api.awards.getNominations.staticKey, awardId],
    queryFn: () => api.awards.getNominations.exec({ params: { id: awardId } }),
    enabled: Boolean(awardId),
  });
};
