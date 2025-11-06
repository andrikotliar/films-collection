import { AwardsApi } from '~/api';
import { queryKeys, type HttpError } from '~/lib';
import { useMutation } from '@tanstack/react-query';

export const useDeleteAward = () => {
  return useMutation<unknown, HttpError, number>({
    mutationFn: AwardsApi.delete,
    meta: {
      invalidateQueries: queryKeys.awards.list,
    },
  });
};
