import { FilmsApi } from '~/api';
import { queryKeys, type HttpError } from '~/shared';
import { useMutation } from '@tanstack/react-query';

export const useDeleteFilm = () => {
  return useMutation<unknown, HttpError, number>({
    mutationFn: FilmsApi.delete,
    meta: {
      invalidateQueries: queryKeys.films.adminList,
    },
  });
};
