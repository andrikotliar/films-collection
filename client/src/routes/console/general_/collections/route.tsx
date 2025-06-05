import { CollectionsApi } from '@/api';
import {
  BackLink,
  ConfirmModal,
  ConsoleContent,
  ConsoleTitle,
  FormSelect,
  FormTextArea,
} from '@/components';
import { useToaster } from '@/hooks';
import { fetchCollectionsListQuery } from '@/queries';
import { BaseForm, FormModal, List } from '@/routes/console/-components';
import { EditCollectionForm } from '@/routes/console/general_/collections/-components';
import { collectionFormDefaultValues } from '@/routes/console/general_/collections/-configs';
import { createCollectionSchema } from '@/routes/console/general_/collections/-validation';
import { Collection } from '@/types';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

export const Route = createFileRoute('/console/general_/collections')({
  loader: async ({ context: { queryClient } }) => {
    await queryClient.ensureQueryData(fetchCollectionsListQuery());
  },
  component: PageContainer,
});

function PageContainer() {
  const toaster = useToaster();
  const { data, refetch } = useSuspenseQuery(fetchCollectionsListQuery());

  const [collectionToDelete, setCollectionToDelete] =
    useState<Collection | null>(null);
  const [collectionToUpdate, setCollectionToUpdate] =
    useState<Collection | null>(null);

  const form = useForm({
    defaultValues: collectionFormDefaultValues,
    resolver: yupResolver(createCollectionSchema),
  });

  const { mutate: createCollection, isPending: isCreating } = useMutation({
    mutationFn: CollectionsApi.createCollection,
    onSuccess: () => {
      refetch();
    },
    onError: (error) => {
      toaster.error(error.message);
    },
  });

  const { mutate: deleteCollection, isPending: isDeleting } = useMutation({
    mutationFn: CollectionsApi.deleteCollection,
    onSuccess: () => {
      refetch();
      setCollectionToDelete(null);
    },
    onError: (error) => {
      toaster.error(error.message);
    },
  });

  return (
    <ConsoleContent>
      <BackLink path="/console/general">Back to categories</BackLink>
      <ConsoleTitle>Collections</ConsoleTitle>
      <FormProvider {...form}>
        <BaseForm
          onSubmit={form.handleSubmit((values) => createCollection(values))}
          isSaving={isCreating}
        >
          <FormSelect
            label="Category"
            options={data.categories}
            name="category"
            isSearchable={false}
          />
          <FormTextArea label="Description" name="description" />
        </BaseForm>
      </FormProvider>
      <List
        items={data.list}
        onDelete={setCollectionToDelete}
        onEdit={setCollectionToUpdate}
      />
      <ConfirmModal
        title={`Delete ${collectionToDelete?.title}?`}
        data={collectionToDelete}
        onClose={() => setCollectionToDelete(null)}
        onConfirm={(data) => deleteCollection(data.id)}
        isPending={isDeleting}
      />
      <FormModal
        isOpen={collectionToUpdate !== null}
        onClose={() => setCollectionToUpdate(null)}
      >
        {collectionToUpdate && (
          <EditCollectionForm
            categories={data.categories}
            onSuccessHandler={() => {
              refetch();
              setCollectionToUpdate(null);
            }}
            initialValues={collectionToUpdate}
          />
        )}
      </FormModal>
    </ConsoleContent>
  );
}
