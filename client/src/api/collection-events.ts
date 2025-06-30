import { apiClient } from '@/services';
import { CollectionEventFilled, CollectionEvent } from '@/types';

export const CollectionEventsApi = {
  getAdminList() {
    return apiClient.get<CollectionEventFilled[]>('/collection-events');
  },

  createEvent(payload: Omit<CollectionEvent, 'id'>) {
    return apiClient.post('/collection-events', {
      payload,
    });
  },

  updateEvent(id: number, payload: Partial<Omit<CollectionEvent, 'id'>>) {
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
