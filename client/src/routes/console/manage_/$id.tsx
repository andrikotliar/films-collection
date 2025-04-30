import { NEW_FILM_ID } from '@/constants';
import { fetchInitialDataQuery } from '@/queries';
import { BackLink, ConsoleContent, ConsoleTitle, Island } from '@/ui';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { object, string } from 'yup';
import { FilmForm } from './-components';
import { filmDefaultFormValues } from './-configs';
import { FormValues } from './-types';
import { LocalStorage } from '@/services';

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
    const localValues = LocalStorage.getItem<FormValues>('FILM_DRAFT');

    if (!isEdit && localValues) {
      return {
        ...localValues,
        poster: null,
      };
    }

    return {
      ...filmDefaultFormValues,
      isDraft: false,
    };
  }, [isEdit]);

  const form = useForm({
    defaultValues,
  });

  const handleSubmit = async (data: FormValues) => {
    console.log(data);
  };

  const values = form.watch();

  useEffect(() => {
    if (!isEdit) {
      const { poster: _poster, ...data } = values;

      LocalStorage.setItem('FILM_DRAFT', data);
    }
  }, [values, isEdit]);

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
