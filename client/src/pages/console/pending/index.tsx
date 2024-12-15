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
} from './components';
import { PendingFilm } from '@/types';
import { ConsoleTitle } from '../components';
import { Priority } from '@/enums';

const defaultFormValues: PendingFilmFormValues = {
  title: '',
  priority: {
    label: Priority.LOW,
    value: 1,
  },
};

export const ConsolePendingFilmsPage = () => {
  const { data, refetch } = useSuspenseQuery(fetchPendingFilmsListQuery());

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
        <ListWrapper>
          {data.map((film) => (
            <PendingFilmRow key={film._id} data={film} />
          ))}
        </ListWrapper>
      </PendingPageLayout>
    </FormProvider>
  );
};
