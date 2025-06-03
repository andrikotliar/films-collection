import { useMutation } from '@tanstack/react-query';
import { FilesApi, PeopleApi } from '@/api';
import { getFileUploadFormData } from '@/helpers';
import { useToaster } from '@/hooks';
import { Person } from '@/types';
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
  const toaster = useToaster();

  return useMutation({
    mutationFn: async (data: MutationFnParams) => {
      let image = data.image;

      if (image instanceof File) {
        const formData = getFileUploadFormData({
          file: image,
          destination: 'actors',
          title: data.name,
          shouldUseUniqueIdentifier: true,
        });

        const response = await FilesApi.upload(formData);

        image = response.filePath;
      }

      const payload = {
        name: data.name,
        image,
      };

      if (data.id) {
        return PeopleApi.updatePerson(data.id, payload);
      }

      return PeopleApi.createPerson(payload);
    },
    onSuccess: onSuccessHandler,
    onError: (error) => {
      toaster.error(error.message);
    },
  });
};
