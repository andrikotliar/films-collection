import { CollectionsApi } from '@/api';
import { FormSelect, FormTextArea } from '@/components';
import { useToaster } from '@/hooks';
import { BaseForm } from '@/routes/console/-components';
import { CollectionFormValues } from '@/routes/console/general_/collections/-types';
import { Collection, ListOption } from '@/types';
import { useMutation } from '@tanstack/react-query';
import { FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

type EditCollectionFormProps = {
  onSuccessHandler: (data: Collection) => void;
  initialValues: Collection;
  categories: ListOption[];
};

export const EditCollectionForm: FC<EditCollectionFormProps> = ({
  onSuccessHandler,
  initialValues,
  categories,
}) => {
  const { id: collectionId, ...defaultValues } = initialValues;

  const toaster = useToaster();
  const form = useForm({
    defaultValues,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: CollectionFormValues) => {
      return CollectionsApi.updateCollection(collectionId, data);
    },
    onSuccess: onSuccessHandler,
    onError: (error) => {
      toaster.error(error.message);
    },
  });

  return (
    <FormProvider {...form}>
      <BaseForm
        title="Edit collection"
        onSubmit={form.handleSubmit((values) => mutate(values))}
        isSaving={isPending}
      >
        <FormSelect
          label="Category"
          options={categories}
          name="category"
          isSearchable={false}
        />
        <FormTextArea label="Description" name="description" />
      </BaseForm>
    </FormProvider>
  );
};
