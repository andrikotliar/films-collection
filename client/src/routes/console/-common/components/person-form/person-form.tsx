import { SaveIcon } from 'lucide-react';
import { Button, Form, FormTextInput, FormTitle } from '@/components';
import { FormProvider, useForm } from 'react-hook-form';
import { type FormComponentProps } from '@/common';
import { useMutatePerson, type PersonMutationPayload } from '@/hooks';
import { yupResolver } from '@hookform/resolvers/yup';
import { personSchema } from '@/routes/console/-common/components/person-form/validation';
import { getFormTitle } from '@/routes/console/-common/helpers';

export type PersonFormProps = FormComponentProps<PersonMutationPayload>;

export const PersonForm = ({ values, afterSubmitEffect }: PersonFormProps) => {
  const form = useForm({
    defaultValues: values,
    resolver: yupResolver(personSchema),
  });

  const { mutateAsync, isPending } = useMutatePerson();

  const title = getFormTitle({
    id: values.id,
    value: values.name,
    label: 'Person',
  });

  const submit = async (data: PersonMutationPayload) => {
    await mutateAsync(data);
    afterSubmitEffect();
  };

  return (
    <FormProvider {...form}>
      <Form>
        <FormTitle>{title}</FormTitle>
        <FormTextInput name="name" label="Person name" />
        <Button onClick={form.handleSubmit(submit)} isLoading={isPending} icon={<SaveIcon />}>
          Submit
        </Button>
      </Form>
    </FormProvider>
  );
};
