import { NEW_FILM_ID } from '@/constants';
import { fetchInitialDataQuery } from '@/queries';
import { BackLink, ConsoleContent, ConsoleTitle, Island } from '@/ui';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { object, string } from 'yup';
import { getDefaultValues } from './-helpers';
import { FilmForm } from './-components';

const consoleFilmQueriesSchema = object({
  title: string(),
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
  const searchParams = Route.useSearch();

  useSuspenseQuery(fetchInitialDataQuery());

  const isEdit = id !== NEW_FILM_ID;
  const pageTitle = isEdit ? 'Edit Film' : 'Add New Film';

  const defaultValues = useMemo(() => {
    return getDefaultValues({ isEdit, title: searchParams.title });
  }, [isEdit, searchParams.title]);

  const form = useForm({
    defaultValues,
  });

  const handleSubmit = (data: unknown) => {};

  return (
    <ConsoleContent>
      <BackLink path="/console/manage">Back to list</BackLink>
      <ConsoleTitle>{pageTitle}</ConsoleTitle>
      <Island>
        <FormProvider {...form}>
          <FilmForm onSubmit={form.handleSubmit(handleSubmit)} />
        </FormProvider>
      </Island>
    </ConsoleContent>
  );
}
