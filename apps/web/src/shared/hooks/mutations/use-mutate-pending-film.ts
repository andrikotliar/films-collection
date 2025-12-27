import { useMutation } from '@tanstack/react-query';
import { mutateEntity } from '~/shared/helpers';
import { api, queryKeys } from '~/shared/services';

export const useMutatePendingFilm = () => {
  return useMutation({
    mutationFn: mutateEntity(api.pendingFilms.create, api.pendingFilms.patch),
    meta: {
      invalidateQueries: [queryKeys.pendingFilms.list()],
    },
  });
};
