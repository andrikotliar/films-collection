import { PendingFilmsApi } from '~/api';
import { queryKeys, type HttpError } from '~/shared';
import { useMutation } from '@tanstack/react-query';

export const useDeletePendingFilm = () => {
  return useMutation<unknown, HttpError, number>({
    mutationFn: PendingFilmsApi.delete,
    meta: {
      invalidateQueries: queryKeys.pendingFilms.list,
    },
  });
};
