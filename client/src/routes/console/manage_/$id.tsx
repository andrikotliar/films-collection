import { fetchInitialDataQuery } from '@/queries';
import { BackLink, ConsoleContent, ConsoleTitle, Panel } from '@/components';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { object, string } from 'yup';
import { FilmForm } from './-components';
import { filmDefaultFormValues } from './-configs';
import { FormValues } from './-types';
import { LocalStorage } from '@/services';
import { NEW_ITEM_ID } from '@/constants';

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

  const idValue = id === NEW_ITEM_ID ? id : Number(id);

  const pageTitle = typeof id === 'number' ? 'Edit Film' : 'Add New Film';

  const defaultValues = useMemo(() => {
    const localValues = LocalStorage.getItem<FormValues>(`films:${idValue}`);

    if (localValues) {
      return {
        ...localValues,
        poster: null,
      };
    }

    return {
      ...filmDefaultFormValues,
      isDraft: false,
    };
  }, [idValue]);

  const form = useForm({
    defaultValues,
  });

  const handleSubmit = async (_data: FormValues) => {
    form.reset(filmDefaultFormValues);
  };

  const values = form.watch();

  useEffect(() => {
    const { poster: _poster, ...data } = values;

    LocalStorage.setItem(`films:${idValue}`, data);
  }, [values, idValue]);

  return (
    <ConsoleContent>
      <BackLink path="/console/manage">Back to list</BackLink>
      <ConsoleTitle>{pageTitle}</ConsoleTitle>
      <Panel>
        <FormProvider {...form}>
          <FilmForm
            onSubmit={form.handleSubmit(handleSubmit)}
            initialOptions={initialOptions}
            filmId={idValue}
          />
        </FormProvider>
      </Panel>
    </ConsoleContent>
  );
}
