import { fetchCollectionEventsQuery } from '@/queries';
import { createFileRoute } from '@tanstack/react-router';
import { CollectionEventsApi, FilesApi } from '@/api';
import {
  CollectionEventForm,
  EditCollectionEventModal,
  Event,
} from '@/routes/console/collection-events/-components';
import { collectionEventSchema } from '@/routes/console/collection-events/-validation';
import { CollectionEventFilled } from '@/types';
import {
  ConfirmModal,
  ConsoleContent,
  ConsoleTitle,
  Panel,
} from '@/components';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { FormValues } from './-types';
import { getFileUploadFormData } from '@/helpers';

type EventModifyContent = CollectionEventFilled | null;

const CollectionEventsContainer = () => {
  const [eventToDelete, setEventToDelete] = useState<EventModifyContent>(null);
  const [eventToUpdate, setEventToUpdate] = useState<EventModifyContent>(null);

  const form = useForm({
    resolver: yupResolver(collectionEventSchema),
  });

  const { data, refetch } = useSuspenseQuery(fetchCollectionEventsQuery());

  const { mutate: createEvent, isPending: isCreating } = useMutation({
    mutationFn: async (data: FormValues) => {
      let image: string | File = data.image;

      if (image instanceof File) {
        const formData = getFileUploadFormData({
          file: image,
          title: data.title,
          destination: 'decoration',
        });
        const response = await FilesApi.upload(formData);

        image = response.filePath;
      }

      return CollectionEventsApi.createEvent({
        ...data,
        image,
      });
    },
    onSuccess: () => {
      form.reset();
      refetch();
    },
  });

  const { mutate: deleteEvent, isPending: isDeleting } = useMutation({
    mutationFn: CollectionEventsApi.deleteEvent,
    onSuccess: () => {
      refetch();
      setEventToDelete(null);
    },
  });

  const handleSubmit = (data: FormValues) => {
    createEvent(data);
  };

  const handleDeleteEvent = (collectionEvent: CollectionEventFilled) => {
    deleteEvent(collectionEvent.id);
  };

  return (
    <ConsoleContent>
      <ConsoleTitle>Collection Events</ConsoleTitle>
      <FormProvider {...form}>
        <CollectionEventForm
          title="Create event"
          onSubmit={form.handleSubmit(handleSubmit)}
          isSaving={isCreating}
        />
      </FormProvider>
      <Panel hasPaddings={false}>
        {data.map((event) => (
          <Event
            data={event}
            key={event.id}
            onDelete={setEventToDelete}
            onEdit={setEventToUpdate}
          />
        ))}
      </Panel>
      <ConfirmModal
        data={eventToDelete}
        onConfirm={handleDeleteEvent}
        onClose={() => setEventToDelete(null)}
        confirmButtonTitle="Delete"
        confirmButtonVariant="danger"
        isPending={isDeleting}
      />
      <EditCollectionEventModal
        defaultValues={eventToUpdate}
        onClose={() => setEventToUpdate(null)}
        refetchList={refetch}
      />
    </ConsoleContent>
  );
};

export const Route = createFileRoute('/console/collection-events')({
  component: CollectionEventsContainer,
  loader: ({ context }) => {
    return context.queryClient.ensureQueryData(fetchCollectionEventsQuery());
  },
});
