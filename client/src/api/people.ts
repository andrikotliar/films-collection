import { apiClient } from '@/services';
import { Person } from '@/types';

export type CreatePersonPayload = {
  name: string;
  image: string | null;
};

export const PeopleApi = {
  searchByName(searchString: string | null) {
    return apiClient.get<Person[]>('/people/search', {
      queryParams: {
        q: searchString,
      },
    });
  },

  createPerson(payload: CreatePersonPayload) {
    return apiClient.post<Person>('/people', {
      payload,
    });
  },
};
