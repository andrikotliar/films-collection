import { Button, Form, FormSelect, FormTextArea, FormTextInput, FormTitle } from '@/components';
import { useMutateCollection, type CollectionMutationPayload } from '@/hooks';
import { fetchInitialDataQuery, type FormComponentProps } from '@/common';
import { useQuery } from '@tanstack/react-query';
import { FormProvider, useForm } from 'react-hook-form';
import { getFormTitle } from '@/routes/console/-common/helpers';
import { SaveIcon } from 'lucide-react';

type CollectionFormProps = FormComponentProps<CollectionMutationPayload>;

export const CollectionForm = ({ values, afterSubmitEffect }: CollectionFormProps) => {
  const { data } = useQuery(fetchInitialDataQuery());

  const form = useForm({
    defaultValues: values,
  });

  const { mutateAsync, isPending } = useMutateCollection();

  const submit = async (data: CollectionMutationPayload) => {
    await mutateAsync(data);
    afterSubmitEffect();
  };

  const formTitle = getFormTitle({
    id: values.id,
    label: 'Collection',
    value: values.title,
  });

  return (
    <FormProvider {...form}>
      <Form onSubmit={submit}>
        <FormTitle>{formTitle}</FormTitle>
        <FormTextInput type="text" name="title" />
        {data && (
          <FormSelect
            label="Category"
            options={data.options.collectionCategories}
            name="category"
            isSearchable={false}
          />
        )}
        <FormTextArea label="Description" name="description" />
        <Button isLoading={isPending} type="submit" icon={<SaveIcon />}>
          Save
        </Button>
      </Form>
    </FormProvider>
  );
};
