import { CollectionEventsApi } from '@/api';
import { CollectionEventForm } from '@/routes/console/collection-events/-components/CollectionEventForm/CollectionEventForm';
import { convertDateCode } from '@/routes/console/collection-events/-helpers';
import { collectionEventSchema } from '@/routes/console/collection-events/-validation';
import { CollectionEventFilled, CollectionEventPayload } from '@/types';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { FC } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

type EditCollectionEventFormProps = {
  defaultValues: CollectionEventFilled;
  onSubmitSuccess: VoidFunction;
};

export const EditCollectionEventForm: FC<EditCollectionEventFormProps> = ({
  defaultValues,
  onSubmitSuccess,
}) => {
  const form = useForm({
    defaultValues: {
      title: defaultValues.title,
      image: defaultValues.image,
      startDate: convertDateCode(defaultValues.startDateCode),
      endDate: convertDateCode(defaultValues.endDateCode),
      collectionId: defaultValues.collection.id,
    },
    resolver: yupResolver(collectionEventSchema),
  });

  const { mutate: updateCollectionEvent, isPending } = useMutation({
    mutationFn: CollectionEventsApi.updateEvent,
    onSuccess: onSubmitSuccess,
  });

  const handleSubmit: SubmitHandler<CollectionEventPayload> = (data) => {
    updateCollectionEvent({
      eventId: defaultValues.id,
      payload: data,
    });
  };

  return (
    <FormProvider {...form}>
      <CollectionEventForm
        onSubmit={form.handleSubmit(handleSubmit)}
        title={`Edit ${defaultValues.title}`}
        isSaving={isPending}
      />
    </FormProvider>
  );
};
