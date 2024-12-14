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

const defaultFormValues: PendingFilmFormValues = {
  title: '',
  priority: 1,
};

export const ConsolePendingFilmsPage = () => {
  const { data, refetch } = useSuspenseQuery(fetchPendingFilmsListQuery());

  const { mutate } = useMutation<PendingFilm, HttpError, PendingFilmFormValues>(
    {
      mutationFn: (payload) => {
        return apiClient.post('/pending-films', {
          payload,
        });
      },
      onSuccess: () => {
        refetch();
      },
    },
  );

  const methods = useForm({
    defaultValues: defaultFormValues,
    resolver: yupResolver(createPendingFilmSchema),
  });

  const handleCreatePendingFilm: SubmitHandler<PendingFilmFormValues> = (
    data,
  ) => {
    mutate(data);
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
