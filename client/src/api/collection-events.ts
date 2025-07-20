import { apiClient } from '@/services';
import { CollectionEventFilled, CollectionEventPayload } from '@/common';

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

  updateEvent(id: number, payload: Partial<CollectionEventPayload>) {
    return apiClient.patch('/collection-events/:id', {
      params: {
        id,
      },
      payload,
    });
  },

  deleteEvent(id: number) {
    return apiClient.delete('/collection-events/:id', {
      params: { id },
    });
  },
};
