import { fetchCountriesListQuery, type CountryMutationPayload, useDeleteCountry } from '~/lib';
import { AddItemButton, ConsoleContentLayout, FormModal, List } from '~/routes/console/-shared';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { CountryForm } from '~/routes/console/general_/countries/-components';
import { countryDefaultValues } from '~/routes/console/general_/countries/-configs';

export const Route = createFileRoute('/console/general_/countries')({
  loader: async ({ context: { queryClient } }) => {
    await queryClient.ensureQueryData(fetchCountriesListQuery());
  },
  component: PageContainer,
});

function PageContainer() {
  const { data } = useSuspenseQuery(fetchCountriesListQuery());
  const [country, setCountry] = useState<CountryMutationPayload | null>(null);

  const { mutateAsync: deleteCountry, isPending: isDeletePending } = useDeleteCountry();

  return (
    <ConsoleContentLayout
      title="Countries"
      backPath="/console/general"
      backPathTitle="Back to categories"
    >
      <AddItemButton onClick={() => setCountry(countryDefaultValues)}>Add country</AddItemButton>
      <List
        items={data}
        onDelete={deleteCountry}
        onEdit={setCountry}
        isDeletingInProgress={isDeletePending}
      />
      <FormModal
        values={country}
        onClose={() => setCountry(null)}
        afterSubmitEffect={() => setCountry(null)}
        form={CountryForm}
      />
    </ConsoleContentLayout>
  );
}
