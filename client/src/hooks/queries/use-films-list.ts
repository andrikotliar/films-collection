import { apiClient } from '@/services';
import { FilmsListFilters, FilmsListResponse } from '@/types';
import { useQuery } from '@tanstack/react-query';

const useFilmsList = (params: FilmsListFilters) => {
  return useQuery({
    queryKey: ['films-collection-list', params] as const,
    queryFn: ({ queryKey }) => {
      return apiClient.get<FilmsListResponse>('/films', queryKey[1]);
    },
    retry: false,
  });
};

export { useFilmsList };
