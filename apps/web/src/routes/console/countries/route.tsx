import { api, getCountriesListQueryOptions, getEmptyFormValues, type Input } from '~/shared';
import {
  AddItemButton,
  ConsoleContentLayout,
  List,
  useFormModal,
  withFormModal,
} from '~/routes/console/-shared';
import { createFileRoute } from '@tanstack/react-router';
import { CountryForm } from '~/routes/console/countries/-components';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';

const countryDefaultValues = getEmptyFormValues<Input<typeof api.countries.create.exec>>({
  title: '',
});

export const Route = createFileRoute('/console/countries')({
  loader: async ({ context: { queryClient } }) => {
    return await queryClient.ensureQueryData(getCountriesListQueryOptions());
  },
  component: withFormModal(CountryForm, PageContainer),
});

function PageContainer() {
  const { data: countries, isFetching } = useSuspenseQuery(getCountriesListQueryOptions());
  const { onOpen } = useFormModal();

  const { mutateAsync: deleteCountry, isPending: isDeletePending } = useMutation({
    mutationFn: (id: number) => api.countries.delete.exec({ params: { id } }),
    meta: {
      invalidateQueries: [api.countries.getList.staticKey, api.initialData.get.staticKey],
    },
  });

  return (
    <ConsoleContentLayout title="Countries" backPath="/console">
      <AddItemButton onClick={() => onOpen(countryDefaultValues)}>Add country</AddItemButton>
      <List
        items={countries}
        onDelete={deleteCountry}
        onEdit={onOpen}
        isDeletingInProgress={isDeletePending}
        isFetching={isFetching}
      />
    </ConsoleContentLayout>
  );
}
