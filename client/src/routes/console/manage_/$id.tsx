import {
  fetchInitialDataQuery,
  fetchPendingFilmQuery,
  NEW_ITEM_ID,
} from '@/common';
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

const consoleFilmQueriesSchema = object({
  pendingFilmId: string(),
});

export const Route = createFileRoute('/console/manage_/$id')({
  validateSearch: (search) => {
    return consoleFilmQueriesSchema.validateSync(search);
  },
  loaderDeps: ({ search }) => {
    return {
      search,
    };
  },
  loader: async ({ context: { queryClient }, deps, params }) => {
    await queryClient.ensureQueryData(fetchInitialDataQuery());

    if (deps.search.pendingFilmId && params.id === NEW_ITEM_ID) {
      await queryClient.ensureQueryData(
        fetchPendingFilmQuery(deps.search.pendingFilmId),
      );
    }
  },
  component: PageContainer,
});

function PageContainer() {
  const { id } = Route.useParams();
  const search = Route.useSearch();

  const { data: initialOptions } = useSuspenseQuery(fetchInitialDataQuery());
  const { data: pendingFilm } = useSuspenseQuery(
    fetchPendingFilmQuery(search.pendingFilmId),
  );

  const idValue = id === NEW_ITEM_ID ? id : Number(id);

  const pageTitle = typeof id === 'number' ? 'Edit Film' : 'Add New Film';

  const defaultValues = useMemo(() => {
    if (pendingFilm) {
      return {
        ...filmDefaultFormValues,
        pendingFilmId: pendingFilm.id,
        title: pendingFilm.title,
        rating: pendingFilm.rating ?? filmDefaultFormValues.rating,
        collections: pendingFilm.collectionId ? [pendingFilm.collectionId] : [],
      };
    }

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
