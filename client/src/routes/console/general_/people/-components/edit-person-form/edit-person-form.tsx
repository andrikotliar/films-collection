import { PersonForm } from '@/routes/console/-common';
import {
  useManagePerson,
  usePersonForm,
} from '@/routes/console/-common/components/person-form/hooks';
import { Person } from '@/common';
import { FormProvider } from 'react-hook-form';

type EditPersonFormProps = {
  person: Person;
  onSuccessHandler: (data: Person) => void;
};

export const EditPersonForm = ({ person, onSuccessHandler }: EditPersonFormProps) => {
  const form = usePersonForm({
    name: person.name,
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
