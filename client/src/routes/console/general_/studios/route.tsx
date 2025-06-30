import { StudiosApi } from '@/api';
import {
  BackLink,
  ConfirmModal,
  ConsoleContent,
  ConsoleTitle,
} from '@/components';
import { useToaster } from '@/hooks';
import { fetchStudiosListQuery } from '@/queries';
import {
  BaseForm,
  EditGeneralDataForm,
  FormModal,
  List,
} from '@/routes/console/-components';
import { useBaseForm } from '@/routes/console/-hooks';
import { GeneralData } from '@/types';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { FormProvider } from 'react-hook-form';

export const Route = createFileRoute('/console/general_/studios')({
  loader: async ({ context: { queryClient } }) => {
    await queryClient.ensureQueryData(fetchStudiosListQuery());
  },
  component: PageContainer,
});

function PageContainer() {
  const { data, refetch } = useSuspenseQuery(fetchStudiosListQuery());
  const { showErrorMessage } = useToaster();
  const form = useBaseForm();
  const [itemToUpdate, setItemToUpdate] = useState<GeneralData | null>(null);
  const [itemToDelete, setItemToDelete] = useState<GeneralData | null>(null);

  const { mutate: createStudio, isPending: isCreating } = useMutation({
    mutationFn: StudiosApi.createStudio,
    onSuccess: () => {
      refetch();
      form.reset();
    },
    onError: (error) => {
      showErrorMessage(error.message);
    },
  });

  const { mutate: deleteStudio, isPending: isDeletePending } = useMutation({
    mutationFn: StudiosApi.deleteStudio,
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
      <ConsoleTitle>Studios</ConsoleTitle>
      <FormProvider {...form}>
        <BaseForm
          title="Create studio"
          onSubmit={form.handleSubmit((values) => createStudio(values))}
          isSaving={isCreating}
        />
      </FormProvider>
      <List items={data} onDelete={setItemToDelete} onEdit={setItemToUpdate} />
      <ConfirmModal
        title={`Delete ${itemToDelete?.title}?`}
        onClose={() => setItemToDelete(null)}
        data={itemToDelete}
        onConfirm={(data) => deleteStudio(data.id)}
        isPending={isDeletePending}
      />
      <FormModal
        isOpen={itemToUpdate !== null}
        onClose={() => setItemToUpdate(null)}
      >
        {itemToUpdate && (
          <EditGeneralDataForm
            defaultValues={itemToUpdate}
            onSubmitSuccess={() => {
              setItemToUpdate(null);
              refetch();
            }}
            updateHandler={StudiosApi.updateStudio}
            title="Edit studio"
          />
        )}
      </FormModal>
    </ConsoleContent>
  );
}
