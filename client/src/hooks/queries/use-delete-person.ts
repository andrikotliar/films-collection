import { PeopleApi } from '@/api';
import { queryKeys } from '@/common';
import { useToaster } from '@/hooks/use-toaster';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeletePerson = () => {
  const queryClient = useQueryClient();
  const toaster = useToaster();

  return useMutation({
    mutationFn: PeopleApi.delete,
    onError(error) {
      toaster.error(error.message);
    },
    async onSuccess() {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.people.adminList,
      });
      await queryClient.invalidateQueries({
        queryKey: queryKeys.people.adminList,
      });
    },
  });
};
