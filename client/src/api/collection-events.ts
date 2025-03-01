import { apiClient } from '@/services';
import { CollectionEventFilled, CollectionEventPayload } from '@/types';

type UpdateEventParams = {
  eventId: number;
  payload: Partial<CollectionEventPayload>;
};

export const CollectionEventsApi = {
  getAdminList() {
    return apiClient.get<CollectionEventFilled[]>(
      '/collection-events/admin/list',
    );
  },

  createEvent(payload: CollectionEventPayload) {
    return apiClient.post('/collection-events', {
      payload,
    });
  },

  updateEvent({ eventId, payload }: UpdateEventParams) {
    return apiClient.patch('/collection-events/:eventId', {
      params: {
        eventId,
      },
      payload,
    });
  },

  deleteEvent(id: number) {
    return apiClient.delete('/collection-events/:eventId', {
      params: { eventId: id },
    });
  },
};
