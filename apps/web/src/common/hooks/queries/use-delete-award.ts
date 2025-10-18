import { AwardsApi } from '~/api';
import { queryKeys } from '~/common';
import type { HttpError } from '~/services';
import { useMutation } from '@tanstack/react-query';

export const useDeleteAward = () => {
  return useMutation<unknown, HttpError, number>({
    mutationFn: AwardsApi.delete,
    meta: {
      invalidateQueries: queryKeys.awards.list,
    },
  });
};
