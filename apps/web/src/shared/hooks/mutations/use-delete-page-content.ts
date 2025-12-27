import { useMutation } from '@tanstack/react-query';
import { api, queryKeys } from '~/shared/services';

export const useDeletePageContent = () => {
  return useMutation({
    mutationFn: (id: number) => api.pageContent.remove({ params: { id } }),
    meta: {
      invalidateQueries: [queryKeys.pageContent.admin.list()],
    },
  });
};
