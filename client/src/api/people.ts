import { apiClient } from '@/services';
import { Person } from '@/types';

export type ManagePersonPayload = {
  name: string;
  image: string | null;
};

export type GetPeopleListQueries = {
  skip: number;
  q?: string;
};

export type PeopleListResponse = {
  list: Person[];
  total: number;
};

export const PeopleApi = {
  searchByName(searchString: string | null) {
    return apiClient.get<Person[]>('/people/search', {
      queryParams: {
        q: searchString,
      },
    });
  },

  getList(queries: GetPeopleListQueries) {
    return apiClient.get<PeopleListResponse>('/people', {
      queryParams: queries,
    });
  },

  createPerson(payload: ManagePersonPayload) {
    return apiClient.post<Person>('/people', {
      payload,
    });
  },

  deletePerson(id: number) {
    return apiClient.delete('/people/:id', {
      params: { id },
    });
  },

  updatePerson(id: number, payload: ManagePersonPayload) {
    return apiClient.patch<Person>('/people/:id', {
      params: {
        id,
      },
      payload,
    });
  },
};
