import type { FormComponentProps } from '@/common';
import { Button, Form, FormTextInput, FormTitle } from '@/components';
import { useMutateGenre, type GenreMutationPayload } from '@/hooks/queries';
import { getFormTitle } from '@/routes/console/-common/helpers';
import { genresFormValidation } from '@/routes/console/general_/genres/-validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { SaveIcon } from 'lucide-react';
import { FormProvider, useForm } from 'react-hook-form';

type GenresFormProps = FormComponentProps<GenreMutationPayload>;

export const GenresForm = ({ values, afterSubmitEffect }: GenresFormProps) => {
  const form = useForm({
    defaultValues: values,
    resolver: yupResolver(genresFormValidation),
  });

  const { mutateAsync, isPending } = useMutateGenre();

  const submit = async (data: GenreMutationPayload) => {
    await mutateAsync(data);
    afterSubmitEffect();
  };

  const formTitle = getFormTitle({
    value: values.title,
    label: 'Create genre',
    id: values.id,
  });

  return (
    <FormProvider {...form}>
      <Form onSubmit={submit}>
        <FormTitle>{formTitle}</FormTitle>
        <FormTextInput name="title" />
        <Button icon={<SaveIcon />} type="submit" isLoading={isPending}>
          Save
        </Button>
      </Form>
    </FormProvider>
  );
};
