import type { FormComponentProps } from '@/common';
import { Button, Form, FormTextInput, FormTitle } from '@/components';
import { type CountryMutationPayload, useMutateCountry } from '@/hooks/queries';
import { getFormTitle } from '@/routes/console/-common/helpers';
import { countryFormValidation } from '@/routes/console/general_/countries/-validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { SaveIcon } from 'lucide-react';
import { FormProvider, useForm } from 'react-hook-form';

type CountryFormProps = FormComponentProps<CountryMutationPayload>;

export const CountryForm = ({ values, afterSubmitEffect }: CountryFormProps) => {
  const form = useForm({
    defaultValues: values,
    resolver: yupResolver(countryFormValidation),
  });

  const { mutateAsync, isPending } = useMutateCountry();

  const submit = async (data: CountryMutationPayload) => {
    await mutateAsync(data);
    afterSubmitEffect();
  };

  const formTitle = getFormTitle({
    value: values.title,
    label: 'Country',
    id: values.id,
  });

  return (
    <FormProvider {...form}>
      <Form onSubmit={submit}>
        <FormTitle>{formTitle}</FormTitle>
        <FormTextInput name="title" />
        <Button type="submit" isLoading={isPending} icon={<SaveIcon />}>
          Save
        </Button>
      </Form>
    </FormProvider>
  );
};
