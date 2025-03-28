import { PendingFilm } from '@/types';
import { FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { PendingFilmForm } from '../PendingFilmForm/PendingFilmForm';
import { PendingFilmFormValues } from '../../-types';
import { useMutation } from '@tanstack/react-query';
import { PendingFilmsApi } from '@/api';

type EditPendingFilmFormProps = {
  defaultValues: PendingFilm;
  onSubmitSuccess: VoidFunction;
};

export const EditPendingFilmForm: FC<EditPendingFilmFormProps> = ({
  defaultValues,
  onSubmitSuccess,
}) => {
  const { mutate: updatePendingFilm, isPending } = useMutation({
    mutationFn: PendingFilmsApi.updatePendingFilm,
    onSuccess: onSubmitSuccess,
  });

  const form = useForm<PendingFilmFormValues>({
    defaultValues: {
      title: defaultValues.title,
      priority: String(defaultValues.priority),
      rating: defaultValues.rating,
      collectionId: String(defaultValues.collectionId),
    },
  });

  const handleSubmit = (data: PendingFilmFormValues) => {
    updatePendingFilm({
      filmId: defaultValues.id,
      payload: {
        title: data.title.trim(),
        priority: Number(data.priority),
        rating: data.rating,
        collectionId: Number(defaultValues.collectionId),
      },
    });
  };

  return (
    <FormProvider {...form}>
      <PendingFilmForm
        title="Edit pending film"
        onSubmit={form.handleSubmit(handleSubmit)}
        isSaving={isPending}
      />
    </FormProvider>
  );
};
