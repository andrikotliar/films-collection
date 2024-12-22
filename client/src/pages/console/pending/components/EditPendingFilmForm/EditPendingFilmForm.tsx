import { PendingFilm } from '@/types';
import { FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { PendingFilmForm } from '../PendingFilmForm/PendingFilmForm';
import { prioritySelectOptions } from '@/configs';
import { PendingFilmFormValues } from '../../types';
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

  const priorityValue = prioritySelectOptions.find(
    (option) => option.value === defaultValues.priority,
  );

  const form = useForm<PendingFilmFormValues>({
    defaultValues: {
      title: defaultValues.title,
      priority: priorityValue ?? prioritySelectOptions[0],
    },
  });

  const handleSubmit = (data: PendingFilmFormValues) => {
    updatePendingFilm({
      filmId: defaultValues._id,
      payload: {
        title: data.title,
        priority: data.priority.value,
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
