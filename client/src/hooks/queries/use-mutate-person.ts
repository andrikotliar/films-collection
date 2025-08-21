import { PeopleApi } from '@/api';
import { mutateEntity, queryKeys, type FormValues } from '@/common';
import { useToaster } from '@/hooks/use-toaster';
import type { HttpError } from '@/services';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export type PersonMutationPayload = FormValues<{
  name: string;
}>;

export const useMutatePerson = () => {
  const queryClient = useQueryClient();
  const toaster = useToaster();

  return useMutation<unknown, HttpError, PersonMutationPayload>({
    mutationFn: (data) => mutateEntity(PeopleApi, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.people.adminList,
      });
    },
    onError: (error) => {
      toaster.error(error.message);
    },
  });
};
