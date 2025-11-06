import { type CollectionEventFilled, type CollectionEvent, apiClient } from '~/lib';

export const CollectionEventsApi = {
  getAdminList() {
    return apiClient.get<CollectionEventFilled[]>('/collection-events');
  },

  create(payload: Omit<CollectionEvent, 'id'>) {
    return apiClient.post<CollectionEvent>('/collection-events', {
      payload,
    });
  },

  update(id: number, payload: Partial<Omit<CollectionEvent, 'id'>>) {
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
