import { PendingFilmsApi } from '~/api';
import {
  mutateEntity,
  queryKeys,
  type FormValues,
  type HttpError,
  type PendingFilm,
} from '~/common';
import { useMutation } from '@tanstack/react-query';

export type PendingFilmMutationPayload = FormValues<
  Omit<PendingFilm, 'id' | 'createdAt' | 'priority'> & {
    priority: string | null;
  }
>;

export const useMutatePendingFilm = () => {
  return useMutation<unknown, HttpError, PendingFilmMutationPayload>({
    mutationFn: async (data) => mutateEntity(PendingFilmsApi, data),
    meta: {
      invalidateQueries: queryKeys.pendingFilms.list,
    },
  });
};
