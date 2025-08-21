import { BackLink, Button, ConsoleContent, ConsoleTitle } from '@/components';
import { useDeleteCountry } from '@/hooks';
import { fetchCountriesListQuery } from '@/common';
import { FormModal, List } from '@/routes/console/-common';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { PlusIcon } from 'lucide-react';
import { CountryForm } from '@/routes/console/general_/countries/components';
import type { CountryMutationPayload } from '@/hooks/queries/use-mutate-country';

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
    <ConsoleContent>
      <BackLink path="/console/general">Back to categories</BackLink>
      <ConsoleTitle>Countries</ConsoleTitle>
      <Button icon={<PlusIcon />}>Add country</Button>
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
    </ConsoleContent>
  );
}
