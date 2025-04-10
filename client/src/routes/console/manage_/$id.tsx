import { NEW_FILM_ID } from '@/constants';
import { fetchInitialDataQuery } from '@/queries';
import { BackLink, ConsoleContent, ConsoleTitle, Island } from '@/ui';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { object, string } from 'yup';
import { FilmForm } from './-components';
import { filmDefaultFormValues } from './-configs';

const consoleFilmQueriesSchema = object({
  pendingFilmId: string(),
});

export const Route = createFileRoute('/console/manage_/$id')({
  validateSearch: (search) => {
    return consoleFilmQueriesSchema.validateSync(search);
  },
  loader: async ({ context: { queryClient } }) => {
    await queryClient.ensureQueryData(fetchInitialDataQuery());
  },
  component: PageContainer,
});

function PageContainer() {
  const { id } = Route.useParams();

  const { data: initialOptions } = useSuspenseQuery(fetchInitialDataQuery());

  const isEdit = id !== NEW_FILM_ID;
  const pageTitle = isEdit ? 'Edit Film' : 'Add New Film';

  const defaultValues = useMemo(() => {
    return {
      ...filmDefaultFormValues,
      isDraft: false,
    };
  }, []);

  const form = useForm({
    defaultValues,
  });

  const handleSubmit = (data: unknown) => {
    console.log(data);
  };

  return (
    <ConsoleContent>
      <BackLink path="/console/manage">Back to list</BackLink>
      <ConsoleTitle>{pageTitle}</ConsoleTitle>
      <Island>
        <FormProvider {...form}>
          <FilmForm
            onSubmit={form.handleSubmit(handleSubmit)}
            initialOptions={initialOptions}
          />
        </FormProvider>
      </Island>
    </ConsoleContent>
  );
}
