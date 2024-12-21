import { fetchPendingFilmsListQuery } from '@/queries';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { createPendingFilmSchema } from './validation';
import { PendingFilmFormValues } from './types';
import {
  PendingFilmForm,
  EditPendingFilmModal,
  ListWrapper,
  PendingFilmRow,
  PendingPageLayout,
  Tools,
} from './components';
import { ConsoleTitle } from '../components';
import { Priority } from '@/enums';
import { getRouteApi } from '@tanstack/react-router';
import { PendingFilmsApi } from '@/api';
import { useState } from 'react';
import { PendingFilm } from '@/types';

const defaultFormValues: PendingFilmFormValues = {
  title: '',
  priority: {
    label: Priority.LOW,
    value: 1,
  },
};

const routeApi = getRouteApi('/console/pending');

export const ConsolePendingFilmsPage = () => {
  const [editModalContent, setEditModalContent] = useState<PendingFilm | null>(
    null,
  );

  const searchParams = routeApi.useSearch();
  const { data, refetch } = useSuspenseQuery(
    fetchPendingFilmsListQuery(searchParams),
  );

  const form = useForm({
    defaultValues: defaultFormValues,
    resolver: yupResolver(createPendingFilmSchema),
  });

  const { mutate: createPendingFilm, isPending: isSaving } = useMutation({
    mutationFn: PendingFilmsApi.createPendingFilm,
    onSuccess: () => {
      refetch();
      form.reset(defaultFormValues);
    },
  });

  const { mutate: deletePendingFilm, isPending: isDeleteInProgress } =
    useMutation({
      mutationFn: PendingFilmsApi.deletePendingFilm,
      onSuccess: () => refetch(),
    });

  const handleCreatePendingFilm: SubmitHandler<PendingFilmFormValues> = (
    data,
  ) => {
    createPendingFilm({
      title: data.title,
      priority: data.priority.value,
    });
  };

  return (
    <PendingPageLayout>
      <ConsoleTitle>Pending Films</ConsoleTitle>
      <FormProvider {...form}>
        <PendingFilmForm
          onSubmit={form.handleSubmit(handleCreatePendingFilm)}
          isSaving={isSaving}
          title="Add pending film"
        />
      </FormProvider>
      <Tools />
      <ListWrapper>
        {data.map((film) => (
          <PendingFilmRow
            key={film._id}
            data={film}
            onDelete={() => deletePendingFilm(film._id)}
            onEdit={() => setEditModalContent(film)}
            isDeleteInProgress={isDeleteInProgress}
          />
        ))}
      </ListWrapper>

      <EditPendingFilmModal
        onClose={() => setEditModalContent(null)}
        defaultValues={editModalContent}
        refetch={refetch}
      />
    </PendingPageLayout>
  );
};
