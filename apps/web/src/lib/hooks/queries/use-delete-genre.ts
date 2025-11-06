import { GenresApi } from '~/api';
import { queryKeys, type HttpError } from '~/lib';
import { useMutation } from '@tanstack/react-query';

export const useDeleteGenre = () => {
  return useMutation<unknown, HttpError, number>({
    mutationFn: GenresApi.delete,
    meta: {
      invalidateQueries: [queryKeys.genres.list, queryKeys.initialData.config],
    },
  });
};
