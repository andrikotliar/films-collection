import { FC } from 'react';
import {
  CreatePersonForm,
  CreatePersonFormProps,
  FormValues,
} from '../create-person-form/create-person-form';
import { FormModal } from '../form-modal/form-modal';
import { Panel, FieldError } from '@/components';
import { useMutation } from '@tanstack/react-query';
import { getFileUploadFormData } from '@/helpers';
import { FilesApi, PeopleApi } from '@/api';
import { Person } from '@/types';

type CreatePersonModalProps = Omit<CreatePersonFormProps, 'onSubmit'> & {
  isOpen: boolean;
  onClose: VoidFunction;
  onCreate: (person: Person) => void;
};

export const CreatePersonModal: FC<CreatePersonModalProps> = ({
  isOpen,
  onClose,
  onCreate,
  ...props
}) => {
  const { mutate, isPending, error } = useMutation({
    mutationFn: async (data: FormValues) => {
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

      return PeopleApi.createPerson({
        ...data,
        image,
      });
    },
    onSuccess: (data) => {
      onCreate(data);
      onClose();
    },
  });

  return (
    <FormModal isOpen={isOpen} onClose={onClose}>
      <Panel>
        <CreatePersonForm onSubmit={mutate} isLoading={isPending} {...props} />
        {error && <FieldError error={error?.message} />}
      </Panel>
    </FormModal>
  );
};
