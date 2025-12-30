import { getCountriesListQueryOptions, useDeleteCountry, useSuspenseCountries } from '~/shared';
import { AddItemButton, ConsoleContentLayout, FormModal, List } from '~/routes/console/-shared';
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import {
  CountryForm,
  type CountryFormSchema,
} from '~/routes/console/general_/countries/-components';
import { countryDefaultValues } from '~/routes/console/general_/countries/-configs';
import type z from 'zod';

export const Route = createFileRoute('/console/general_/countries')({
  loader: async ({ context: { queryClient } }) => {
    return await queryClient.ensureQueryData(getCountriesListQueryOptions());
  },
  component: PageContainer,
});

function PageContainer() {
  const { data: countries } = useSuspenseCountries();
  const [country, setCountry] = useState<z.infer<typeof CountryFormSchema> | null>(null);

  const { mutateAsync: deleteCountry, isPending: isDeletePending } = useDeleteCountry();

  return (
    <ConsoleContentLayout
      title="Countries"
      backPath="/console/general"
      backPathTitle="Back to categories"
    >
      <AddItemButton onClick={() => setCountry(countryDefaultValues)}>Add country</AddItemButton>
      <List
        items={countries}
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
