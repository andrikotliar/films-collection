import { PendingFilm } from '@/common';
import { FormProvider, useForm } from 'react-hook-form';
import { PendingFilmForm } from '../pending-film-form/pending-film-form';
import { PendingFilmFormValues } from '../../-types';
import { useMutation } from '@tanstack/react-query';
import { PendingFilmsApi } from '@/api';

type EditPendingFilmFormProps = {
  initialValues: PendingFilm;
  onSubmitSuccess: VoidFunction;
};

export const EditPendingFilmForm = ({
  initialValues,
  onSubmitSuccess,
}: EditPendingFilmFormProps) => {
  const { mutate: updatePendingFilm, isPending } = useMutation({
    mutationFn: (data: PendingFilmFormValues) => {
      return PendingFilmsApi.updatePendingFilm(initialValues.id, {
        title: data.title.trim(),
        priority: Number(data.priority),
        rating: data.rating,
        collectionId: data.collectionId ? Number(data.collectionId) : null,
      });
    },
    onSuccess: onSubmitSuccess,
  });

  const form = useForm<PendingFilmFormValues>({
    defaultValues: {
      title: initialValues.title,
      priority: String(initialValues.priority),
      rating: initialValues.rating,
      collectionId: initialValues.collectionId,
    },
  });

  return (
    <FormProvider {...form}>
      <PendingFilmForm
        title="Edit pending film"
        onSubmit={form.handleSubmit((values) => updatePendingFilm(values))}
        isSaving={isPending}
      />
    </FormProvider>
  );
};
