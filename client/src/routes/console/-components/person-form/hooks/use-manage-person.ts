import { useMutation } from '@tanstack/react-query';
import { FilesApi, PeopleApi } from '@/api';
import { getFileUploadFormData } from '@/common';
import { useToaster } from '@/hooks';
import { Person } from '@/common';
import { PersonFormValues } from '../types';

type UseManagePersonParams = {
  onSuccessHandler: (data: Person) => void;
};

type MutationFnParams = PersonFormValues & {
  id?: number;
};

export const useManagePerson = ({
  onSuccessHandler,
}: UseManagePersonParams) => {
  const { showErrorMessage } = useToaster();

  return useMutation({
    mutationFn: async (data: MutationFnParams) => {
      const payload = {
        name: data.name,
      };

      if (data.id) {
        return PeopleApi.updatePerson(data.id, payload);
      }

      return PeopleApi.createPerson(payload);
    },
    onSuccess: onSuccessHandler,
    onError: (error) => {
      showErrorMessage(error.message);
    },
  });
};
