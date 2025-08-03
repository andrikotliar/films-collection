import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { FormProvider, useForm } from 'react-hook-form';
import { CollectionEventsApi } from '@/api';
import { type FormValues } from '@/routes/console/collection-events/-types';
import { collectionEventSchema } from '@/routes/console/collection-events/-validation';
import { type CollectionEventFilled } from '@/common';
import { CollectionEventForm } from '../collection-event-form/collection-event-form';
import { isOneDayEvent } from '@/routes/console/collection-events/-helpers';

type EditCollectionEventFormProps = {
  defaultValues: CollectionEventFilled;
  onSubmitSuccess: VoidFunction;
};

export const EditCollectionEventForm = ({
  defaultValues,
  onSubmitSuccess,
}: EditCollectionEventFormProps) => {
  const form = useForm({
    defaultValues: {
      ...defaultValues,
      collectionId: defaultValues.collection.id,
      titleFilmId: defaultValues.film.id,
      isOneDayEvent: isOneDayEvent(defaultValues),
    },
    resolver: yupResolver(collectionEventSchema),
  });

  const { mutate: updateCollectionEvent, isPending } = useMutation({
    mutationFn: async (data: FormValues) => {
      return CollectionEventsApi.updateEvent(defaultValues.id, data);
    },
    onSuccess: onSubmitSuccess,
  });

  return (
    <FormProvider {...form}>
      <CollectionEventForm
        onSubmit={form.handleSubmit((data) => updateCollectionEvent(data))}
        title={`Edit ${defaultValues.title}`}
        isSaving={isPending}
      />
    </FormProvider>
  );
};
