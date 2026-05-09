import { api, getCountriesListQueryOptions, getEmptyFormValues, type Input } from '~/shared';
import { List, useFormModal, withFormModal } from '~/routes/console/-shared';
import { createFileRoute } from '@tanstack/react-router';
import { CountryForm } from '~/routes/console/countries/-components';
import { mutationOptions, useSuspenseQuery } from '@tanstack/react-query';

const countryDefaultValues = getEmptyFormValues<Input<typeof api.countries.create.exec>>({
  title: '',
});

export const Route = createFileRoute('/console/countries')({
  loader: async ({ context: { queryClient } }) => {
    return await queryClient.ensureQueryData(getCountriesListQueryOptions());
  },
  component: withFormModal(CountryForm, PageContainer),
  staticData: {
    title: 'Countries',
    backPath: '/console',
  },
});

const getDeleteMutationOptions = () => {
  return mutationOptions({
    mutationFn: (id: number) => api.countries.delete.exec({ params: { id } }),
    meta: {
      invalidateQueries: [
        { queryKey: api.countries.getList.staticKey },
        { queryKey: api.initialData.get.staticKey },
      ],
    },
  });
};

function PageContainer() {
  const { data: countries, isFetching } = useSuspenseQuery(getCountriesListQueryOptions());
  const { onOpen } = useFormModal();

  return (
    <List
      data={{ list: countries }}
      getDeleteMutationOptions={getDeleteMutationOptions}
      onEdit={onOpen}
      isFetching={isFetching}
      onCreate={() => onOpen(countryDefaultValues)}
    />
  );
}
