import { PageContentApi } from '~/api';
import { queryKeys, type HttpError } from '~/shared';
import { useMutation } from '@tanstack/react-query';

export const useDeletePageContent = () => {
  return useMutation<unknown, HttpError, number>({
    mutationFn: PageContentApi.delete,
    meta: {
      invalidateQueries: queryKeys.pageContent.list,
    },
  });
};
