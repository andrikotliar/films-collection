import {
  api,
  getCountriesListQueryOptions,
  getEmptyFormValues,
  queryKeys,
  type Input,
} from '~/shared';
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

const countryDefaultValues = getEmptyFormValues<Input<typeof api.countries.create>>({
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
    mutationFn: (id: number) => api.countries.remove({ params: { id } }),
    meta: {
      invalidateQueries: [queryKeys.countries.list(), queryKeys.initialData.list()],
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
