import { GenresApi } from '@/api';
import { BackLink, ConfirmModal, ConsoleContent, ConsoleTitle } from '@/components';
import { useToaster } from '@/hooks';
import { BaseForm, EditGeneralDataForm, FormModal, List } from '@/routes/console/-components';
import { useBaseForm } from '@/routes/console/-common/hooks';
import { GeneralData, fetchGenresListQuery } from '@/common';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { FormProvider } from 'react-hook-form';

export const Route = createFileRoute('/console/general_/genres')({
  loader: async ({ context: { queryClient } }) => {
    await queryClient.ensureQueryData(fetchGenresListQuery());
  },
  component: PageContainer,
});

function PageContainer() {
  const { data, refetch } = useSuspenseQuery(fetchGenresListQuery());
  const { showErrorMessage } = useToaster();
  const form = useBaseForm();
  const [itemToUpdate, setItemToUpdate] = useState<GeneralData | null>(null);
  const [itemToDelete, setItemToDelete] = useState<GeneralData | null>(null);

  const { mutate: createGenre, isPending: isCreating } = useMutation({
    mutationFn: GenresApi.createGenre,
    onSuccess: () => {
      refetch();
      form.reset();
    },
    onError: (error) => {
      showErrorMessage(error.message);
    },
  });

  const { mutate: deleteGenre, isPending: isDeletePending } = useMutation({
    mutationFn: GenresApi.deleteGenre,
    onSuccess: () => {
      refetch();
      setItemToDelete(null);
    },
    onError: (error) => {
      showErrorMessage(error.message);
    },
  });

  return (
    <ConsoleContent>
      <BackLink path="/console/general">Back to categories</BackLink>
      <ConsoleTitle>Genres</ConsoleTitle>
      <FormProvider {...form}>
        <BaseForm
          title="Create genre"
          onSubmit={form.handleSubmit((values) => createGenre(values))}
          isSaving={isCreating}
        />
      </FormProvider>
      <List items={data} onDelete={setItemToDelete} onEdit={setItemToUpdate} />
      <ConfirmModal
        title={`Delete ${itemToDelete?.title}?`}
        onClose={() => setItemToDelete(null)}
        data={itemToDelete}
        onConfirm={(data) => deleteGenre(data.id)}
        isPending={isDeletePending}
      />
      <FormModal isOpen={itemToUpdate !== null} onClose={() => setItemToUpdate(null)}>
        {itemToUpdate && (
          <EditGeneralDataForm
            defaultValues={itemToUpdate}
            onSubmitSuccess={() => {
              setItemToUpdate(null);
              refetch();
            }}
            updateHandler={GenresApi.updateGenre}
            title="Edit genre"
          />
        )}
      </FormModal>
    </ConsoleContent>
  );
}
