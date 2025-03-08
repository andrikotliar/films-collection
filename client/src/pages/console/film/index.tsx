import { NEW_FILM_ID } from '@/constants';
import { BackLink, ConsoleContentLayout, ConsoleTitle, Island } from '@/ui';
import { getRouteApi } from '@tanstack/react-router';
import { useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { getDefaultValues } from './helpers';
import { FilmForm } from './components';
import { useSuspenseQuery } from '@tanstack/react-query';
import { fetchInitialDataQuery } from '@/queries';

const routeApi = getRouteApi('/console/manage_/$id');

export const ConsoleFilm = () => {
  const { id } = routeApi.useParams();
  const searchParams = routeApi.useSearch();

  useSuspenseQuery(fetchInitialDataQuery());

  const isEdit = id !== NEW_FILM_ID;
  const pageTitle = isEdit ? 'Edit Film' : 'Add New Film';

  const defaultValues = useMemo(() => {
    return getDefaultValues({ isEdit, title: searchParams.title });
  }, [isEdit, searchParams.title]);

  const form = useForm({
    defaultValues,
  });

  const handleSubmit = (data: unknown) => {
    console.log(data);
    // form.reset(defaultValues);
  };

  return (
    <ConsoleContentLayout>
      <BackLink path="/console/manage">Back to list</BackLink>
      <ConsoleTitle>{pageTitle}</ConsoleTitle>
      <Island>
        <FormProvider {...form}>
          <FilmForm onSubmit={form.handleSubmit(handleSubmit)} />
        </FormProvider>
      </Island>
    </ConsoleContentLayout>
  );
};
