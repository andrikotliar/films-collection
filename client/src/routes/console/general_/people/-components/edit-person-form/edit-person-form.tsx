import { PersonForm } from '@/routes/console/-components';
import {
  useManagePerson,
  usePersonForm,
} from '@/routes/console/-components/person-form/hooks';
import { Person } from '@/common';
import { FormProvider } from 'react-hook-form';

type EditPersonFormProps = {
  person: Person;
  onSuccessHandler: (data: Person) => void;
};

export const EditPersonForm = ({
  person,
  onSuccessHandler,
}: EditPersonFormProps) => {
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
