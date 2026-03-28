import { queryOptions } from '@tanstack/react-query';
import { isNewItem } from '~/shared/helpers/is-new-item';
import { api } from '~/shared/services';
import type { MixedId } from '~/shared/types';

export const getAdminFilmDetailsQueryOptions = (id: MixedId) => {
  return queryOptions({
    queryKey: [api.films.getEditableFilm.staticKey, id],
    queryFn: () => {
      if (isNewItem(id)) {
        return null;
      }

      return api.films.getEditableFilm.exec({ params: { id } });
    },
    enabled: !isNewItem(id),
  });
};
