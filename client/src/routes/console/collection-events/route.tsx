import { fetchCollectionEventsQuery } from '@/queries';
import { createFileRoute } from '@tanstack/react-router';
import { CollectionEventsApi } from '@/api';
import {
  CollectionEventForm,
  EditCollectionEventModal,
  Event,
} from '@/routes/console/collection-events/-components';
import { collectionEventSchema } from '@/routes/console/collection-events/-validation';
import { CollectionEventFilled, CollectionEventPayload } from '@/types';
import { ConfirmModal, ConsoleContentLayout, ConsoleTitle, Island } from '@/ui';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

type EventModifyContent = CollectionEventFilled | null;

const CollectionEventsContainer = () => {
  const [eventToDelete, setEventToDelete] = useState<EventModifyContent>(null);
  const [eventToUpdate, setEventToUpdate] = useState<EventModifyContent>(null);

  const form = useForm({
    resolver: yupResolver(collectionEventSchema),
  });

  const { data, refetch } = useSuspenseQuery(fetchCollectionEventsQuery());

  const { mutate: createEvent, isPending: isCreating } = useMutation({
    mutationFn: CollectionEventsApi.createEvent,
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

  const handleSubmit: SubmitHandler<CollectionEventPayload> = (data) => {
    createEvent(data);
  };

  const handleDeleteEvent = (collectionEvent: CollectionEventFilled) => {
    deleteEvent(collectionEvent.id);
  };

  return (
    <ConsoleContentLayout>
      <ConsoleTitle>Collection Events</ConsoleTitle>
      <FormProvider {...form}>
        <CollectionEventForm
          title="Create event"
          onSubmit={form.handleSubmit(handleSubmit)}
          isSaving={isCreating}
        />
      </FormProvider>
      <Island hasPaddings={false}>
        {data.map((event) => (
          <Event
            data={event}
            key={event.id}
            onDelete={setEventToDelete}
            onEdit={setEventToUpdate}
          />
        ))}
      </Island>
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
    </ConsoleContentLayout>
  );
};

export const Route = createFileRoute('/console/collection-events')({
  component: CollectionEventsContainer,
  loader: ({ context }) => {
    return context.queryClient.ensureQueryData(fetchCollectionEventsQuery());
  },
});
