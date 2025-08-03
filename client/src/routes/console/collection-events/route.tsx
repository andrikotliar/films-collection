import { fetchCollectionEventsQuery, type CollectionEventFilled } from '@/common';
import { createFileRoute } from '@tanstack/react-router';
import {
  CollectionEventForm,
  EditCollectionEventForm,
  Event,
  EventsList,
} from '@/routes/console/collection-events/-components';
import { collectionEventSchema } from '@/routes/console/collection-events/-validation';
import { ConfirmModal, ConsoleContent, ConsoleTitle } from '@/components';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { type FormValues } from './-types';
import { FormModal } from '@/routes/console/-components';
import { getDefaultValues } from '@/routes/console/collection-events/-configs';
import { useCreateCollectionEvent, useDeleteCollectionEvent } from '@/hooks';

type EventModifyContent = CollectionEventFilled | null;

const CollectionEventsContainer = () => {
  const [eventToDelete, setEventToDelete] = useState<EventModifyContent>(null);
  const [eventToUpdate, setEventToUpdate] = useState<EventModifyContent>(null);

  const form = useForm({
    defaultValues: getDefaultValues(),
    resolver: yupResolver(collectionEventSchema),
  });

  const { data, refetch } = useSuspenseQuery(fetchCollectionEventsQuery());

  const { mutateAsync: createEvent, isPending: isCreating } = useCreateCollectionEvent();
  const { mutateAsync: deleteEvent, isPending: isDeleting } = useDeleteCollectionEvent();

  const handleSubmit = async (data: FormValues) => {
    const { isOneDayEvent, ...event } = data;

    if (isOneDayEvent) {
      event.endDate = event.startDate;
    }

    await createEvent(event);
    form.reset();
  };

  const handleDeleteEvent = async (collectionEvent: CollectionEventFilled) => {
    await deleteEvent(collectionEvent.id);
    setEventToDelete(null);
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
      <EventsList>
        {data.map((event) => (
          <Event
            data={event}
            key={event.id}
            onDelete={setEventToDelete}
            onEdit={setEventToUpdate}
          />
        ))}
      </EventsList>
      <ConfirmModal
        data={eventToDelete}
        onConfirm={handleDeleteEvent}
        onClose={() => setEventToDelete(null)}
        confirmButtonTitle="Delete"
        confirmButtonVariant="danger"
        isPending={isDeleting}
      />
      <FormModal isOpen={eventToUpdate !== null} onClose={() => setEventToUpdate(null)}>
        {eventToUpdate && (
          <EditCollectionEventForm
            defaultValues={eventToUpdate}
            onSubmitSuccess={() => {
              refetch();
              setEventToUpdate(null);
            }}
          />
        )}
      </FormModal>
    </ConsoleContent>
  );
};

export const Route = createFileRoute('/console/collection-events')({
  component: CollectionEventsContainer,
  loader: ({ context }) => {
    return context.queryClient.ensureQueryData(fetchCollectionEventsQuery());
  },
});
