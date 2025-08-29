import { PageContentApi } from '@/api';
import { queryKeys } from '@/common';
import type { HttpError } from '@/services';
import { useMutation } from '@tanstack/react-query';

export const useDeletePageContent = () => {
  return useMutation<unknown, HttpError, number>({
    mutationFn: PageContentApi.delete,
    meta: {
      invalidateQueries: queryKeys.pageContent.list,
    },
  });
};
