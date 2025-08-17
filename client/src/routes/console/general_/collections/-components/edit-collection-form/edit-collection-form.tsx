import { CollectionsApi } from '@/api';
import { FormSelect, FormTextArea } from '@/components';
import { useToaster } from '@/hooks';
import { BaseForm } from '@/routes/console/-common';
import { type CollectionFormValues } from '@/routes/console/general_/collections/-types';
import { type Collection, type ListOption } from '@/common';
import { useMutation } from '@tanstack/react-query';
import { FormProvider, useForm } from 'react-hook-form';

type EditCollectionFormProps = {
  onSuccessHandler: (data: Collection) => void;
  initialValues: Collection;
  categories: ListOption[];
};

export const EditCollectionForm = ({
  onSuccessHandler,
  initialValues,
  categories,
}: EditCollectionFormProps) => {
  const { id: collectionId, ...defaultValues } = initialValues;

  const { showErrorMessage } = useToaster();
  const form = useForm({
    defaultValues,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: CollectionFormValues) => {
      return CollectionsApi.updateCollection(collectionId, data);
    },
    onSuccess: onSuccessHandler,
    onError: (error) => {
      showErrorMessage(error.message);
    },
  });

  return (
    <FormProvider {...form}>
      <BaseForm
        title="Edit collection"
        onSubmit={form.handleSubmit((values) => mutate(values))}
        isSaving={isPending}
      >
        <FormSelect label="Category" options={categories} name="category" isSearchable={false} />
        <FormTextArea label="Description" name="description" />
      </BaseForm>
    </FormProvider>
  );
};
