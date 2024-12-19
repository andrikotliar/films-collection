import { fetchPendingFilmsListQuery } from '@/queries';
import { apiClient, HttpError } from '@/services';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { createPendingFilmSchema } from './validation';
import { PendingFilmFormValues } from './types';
import {
  CreatePendingFilmForm,
  ListWrapper,
  PendingFilmRow,
  PendingPageLayout,
  Tools,
} from './components';
import { PendingFilm } from '@/types';
import { ConsoleTitle } from '../components';
import { Priority } from '@/enums';
import { getRouteApi } from '@tanstack/react-router';

const defaultFormValues: PendingFilmFormValues = {
  title: '',
  priority: {
    label: Priority.LOW,
    value: 1,
  },
};

const routeApi = getRouteApi('/console/pending');

export const ConsolePendingFilmsPage = () => {
  const searchParams = routeApi.useSearch();
  const { data, refetch } = useSuspenseQuery(
    fetchPendingFilmsListQuery(searchParams),
  );

  const methods = useForm({
    defaultValues: defaultFormValues,
    resolver: yupResolver(createPendingFilmSchema),
  });

  const { mutate } = useMutation<
    PendingFilm,
    HttpError,
    Pick<PendingFilm, 'title' | 'priority'>
  >({
    mutationFn: (payload) => {
      return apiClient.post('/pending-films', {
        payload,
      });
    },
    onSuccess: () => {
      refetch();
      methods.reset(defaultFormValues);
    },
  });

  const handleCreatePendingFilm: SubmitHandler<PendingFilmFormValues> = (
    data,
  ) => {
    mutate({
      title: data.title,
      priority: data.priority.value,
    });
  };

  return (
    <FormProvider {...methods}>
      <PendingPageLayout>
        <ConsoleTitle>Pending Films</ConsoleTitle>
        <CreatePendingFilmForm
          onSubmit={methods.handleSubmit(handleCreatePendingFilm)}
        />
        <Tools />
        <ListWrapper>
          {data.map((film) => (
            <PendingFilmRow key={film._id} data={film} />
          ))}
        </ListWrapper>
      </PendingPageLayout>
    </FormProvider>
  );
};
