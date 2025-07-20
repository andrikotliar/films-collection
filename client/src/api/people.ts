import { apiClient } from '@/services';
import { ListOption, Person } from '@/common';

export type ManagePersonPayload = {
  name: string;
  image: string | null;
};

export type GetPeopleListQueries = {
  skip: number;
  q?: string;
  role?: string;
};

export type PeopleListResponse = {
  list: Person[];
  total: number;
};

export const PeopleApi = {
  searchByName(searchString: string | null, selected?: (number | string)[]) {
    const queryParams: Record<string, unknown> = {};

    if (searchString) {
      queryParams.q = searchString;
    }

    if (selected) {
      queryParams.selected = selected;
    }

    return apiClient.get<ListOption<number>[]>('/people/search', {
      queryParams,
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
