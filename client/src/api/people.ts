import { apiClient } from '@/services';
import { Person } from '@/types';

export type SearchByNamePayload = {
  query: string | null;
  selectedIds?: number[];
};

export const PeopleApi = {
  searchByName({ query, selectedIds }: SearchByNamePayload) {
    return apiClient.get<Person[]>('/people/search', {
      queryParams: {
        q: query,
        selectedIds,
      },
    });
  },
};
