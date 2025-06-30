import { CountriesApi } from '@/api';
import {
  BackLink,
  ConfirmModal,
  ConsoleContent,
  ConsoleTitle,
} from '@/components';
import { useToaster } from '@/hooks';
import { fetchCountriesListQuery } from '@/queries';
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

export const Route = createFileRoute('/console/general_/countries')({
  loader: async ({ context: { queryClient } }) => {
    await queryClient.ensureQueryData(fetchCountriesListQuery());
  },
  component: PageContainer,
});

function PageContainer() {
  const { data, refetch } = useSuspenseQuery(fetchCountriesListQuery());
  const { showErrorMessage } = useToaster();
  const form = useBaseForm();
  const [itemToUpdate, setItemToUpdate] = useState<GeneralData | null>(null);
  const [itemToDelete, setItemToDelete] = useState<GeneralData | null>(null);

  const { mutate: createCountry, isPending: isCreating } = useMutation({
    mutationFn: CountriesApi.createCountry,
    onSuccess: () => {
      refetch();
      form.reset();
    },
    onError: (error) => {
      showErrorMessage(error.message);
    },
  });

  const { mutate: deleteCountry, isPending: isDeletePending } = useMutation({
    mutationFn: CountriesApi.deleteCountry,
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
      <ConsoleTitle>Countries</ConsoleTitle>
      <FormProvider {...form}>
        <BaseForm
          title="Create country"
          onSubmit={form.handleSubmit((values) => createCountry(values))}
          isSaving={isCreating}
        />
      </FormProvider>
      <List items={data} onDelete={setItemToDelete} onEdit={setItemToUpdate} />
      <ConfirmModal
        title={`Delete ${itemToDelete?.title}?`}
        onClose={() => setItemToDelete(null)}
        data={itemToDelete}
        onConfirm={(data) => deleteCountry(data.id)}
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
            updateHandler={CountriesApi.updateCountry}
            title="Edit country"
          />
        )}
      </FormModal>
    </ConsoleContent>
  );
}
