import { useMutation } from '@tanstack/react-query';
import { api } from '~/shared';

export const useDeleteFilm = () => {
  return useMutation({
    mutationFn: (id: number) => api.films.delete.exec({ params: { id } }),
    meta: {
      invalidateQueries: [
        { queryKey: api.films.getAdminList.staticKey },
        { queryKey: api.films.getAdminIncompleteFilmsList.staticKey },
      ],
    },
  });
};
