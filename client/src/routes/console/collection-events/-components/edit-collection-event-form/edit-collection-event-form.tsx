import { FC } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { FormProvider, useForm } from 'react-hook-form';
import { CollectionEventsApi, FilesApi } from '@/api';
import { getFileUploadFormData } from '@/helpers';
import { convertDateCode } from '@/routes/console/collection-events/-helpers';
import { FormValues } from '@/routes/console/collection-events/-types';
import { collectionEventSchema } from '@/routes/console/collection-events/-validation';
import { CollectionEventFilled } from '@/types';
import { CollectionEventForm } from '../collection-event-form/collection-event-form';

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
    mutationFn: async (data: FormValues) => {
      let image: string | File = data.image;

      if (image instanceof File) {
        const formData = getFileUploadFormData({
          title: data.title,
          file: image,
          destination: 'decoration',
        });

        const response = await FilesApi.upload(formData);

        image = response.filePath;
      }

      return CollectionEventsApi.updateEvent(defaultValues.id, {
        ...data,
        image,
      });
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
