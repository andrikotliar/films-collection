import { useMutation } from '@tanstack/react-query';
import { api, queryKeys } from '~/shared/services';

export const useDeleteFilm = () => {
  return useMutation({
    mutationFn: (id: number) => api.films.admin.remove({ params: { id } }),
    meta: {
      invalidateQueries: [queryKeys.films.admin.list()],
    },
  });
};
