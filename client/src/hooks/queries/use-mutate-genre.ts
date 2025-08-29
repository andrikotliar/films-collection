import { GenresApi } from '@/api';
import { mutateEntity, queryKeys, type Genre, type FormValues, type OmitId } from '@/common';
import type { HttpError } from '@/services';
import { useMutation } from '@tanstack/react-query';

export type GenreMutationPayload = FormValues<OmitId<Genre>>;

export const useMutateGenre = () => {
  return useMutation<unknown, HttpError, GenreMutationPayload>({
    mutationFn: (data) => mutateEntity(GenresApi, data),
    meta: {
      invalidateQueries: [queryKeys.genres.list, queryKeys.initialData.config],
    },
  });
};
