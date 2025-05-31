import { PersonForm } from '@/routes/console/-components';
import {
  useManagePerson,
  usePersonForm,
} from '@/routes/console/-components/person-form/hooks';
import { Person } from '@/types';
import { FC } from 'react';
import { FormProvider } from 'react-hook-form';

type EditPersonFormProps = {
  person: Person;
  onSuccessHandler: (data: Person) => void;
};

export const EditPersonForm: FC<EditPersonFormProps> = ({
  person,
  onSuccessHandler,
}) => {
  const form = usePersonForm({
    name: person.name,
    image: person.image,
  });

  const { mutate, isPending } = useManagePerson({
    onSuccessHandler,
  });

  return (
    <FormProvider {...form}>
      <PersonForm
        onSubmit={form.handleSubmit((values) => {
          mutate({
            ...values,
            id: person.id,
          });
        })}
        isLoading={isPending}
      />
    </FormProvider>
  );
};
