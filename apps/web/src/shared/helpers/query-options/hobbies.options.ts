import { queryOptions } from '@tanstack/react-query';
import { isNewItem } from '~/shared/helpers/is-new-item';
import { api, queryKey } from '~/shared/services';
import type { MixedId, QueryParams } from '~/shared/types';

export const buildGetHobbiesListQueryOptions = () => {
  return queryOptions({
    queryKey: queryKey('hobbies.getHobbiesList'),
    queryFn: () => api.hobbies.getHobbiesList(),
  });
};

export const buildGetHobbyAdminQueryOptions = (hobbyId: number) => {
  return queryOptions({
    queryKey: queryKey('hobbies.getHobbyAdmin', hobbyId),
    queryFn: () => api.hobbies.getHobbyAdmin({ params: { id: hobbyId }, queryParams: {} }),
  });
};

export const buildGetHobbyByTitleQueryOptions = (title: string) => {
  return queryOptions({
    queryKey: queryKey('hobbies.getHobbyByTitle', title),
    queryFn: () => api.hobbies.getHobbyByTitle({ params: { title } }),
  });
};

export const buildGetHobbyItemsByCollectionQueryOptions = (collectionId: MixedId) => {
  return queryOptions({
    queryKey: queryKey('hobbies.getHobbiesByCollection', collectionId),
    queryFn: async () => {
      if (isNewItem(collectionId)) {
        return;
      }
      return await api.hobbies.getHobbiesByCollection({ params: { id: collectionId } });
    },
    enabled: !!collectionId && !isNewItem(collectionId),
  });
};

export const buildGetHobbyWithItemsQueryOptions = (
  id: string,
  queryParams: QueryParams<typeof api.hobbies.getHobby>,
) => {
  return queryOptions({
    queryKey: queryKey('hobbies.getHobby', id, queryParams),
    queryFn: () => api.hobbies.getHobby({ params: { id: Number(id) }, queryParams }),
  });
};
