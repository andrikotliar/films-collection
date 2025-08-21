import type { FormComponentProps } from '@/common';
import { Button, Form, FormTextInput, FormTitle } from '@/components';
import { type StudioMutationPayload, useMutateStudio } from '@/hooks/queries';
import { getFormTitle } from '@/routes/console/-common/helpers';
import { countryFormValidation } from '@/routes/console/general_/countries/validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { SaveIcon } from 'lucide-react';
import { FormProvider, useForm } from 'react-hook-form';

type StudioFormProps = FormComponentProps<StudioMutationPayload>;

export const StudioForm = ({ values, afterSubmitEffect }: StudioFormProps) => {
  const form = useForm({
    defaultValues: values,
    resolver: yupResolver(countryFormValidation),
  });

  const { mutateAsync, isPending } = useMutateStudio();

  const submit = async (data: StudioMutationPayload) => {
    await mutateAsync(data);
    afterSubmitEffect();
  };

  const formTitle = getFormTitle({
    values,
    newItemTitle: 'Create studio',
    existingItemTitle: 'Update studio: {}',
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
