import { apiClient } from '@/services';
import { FilmData } from '@/types';
import { useQuery } from '@tanstack/react-query';

const useOneFilm = (id?: string) => {
  return useQuery({
    queryKey: ['film', id],
    queryFn: ({ queryKey }) => apiClient.get<FilmData>(`/films/${queryKey[1]}`),
  });
};

export { useOneFilm };
