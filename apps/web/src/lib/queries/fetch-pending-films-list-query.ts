import { PendingFilmsApi } from '~/api';
import { PENDING_FILMS_PER_PAGE } from '../constants';
import { type PendingFilmQueryFilters } from '../types';
import { queryOptions } from '@tanstack/react-query';
import { queryKeys } from '~/lib/configs';

export const fetchPendingFilmsListQuery = (params: PendingFilmQueryFilters) => {
  return queryOptions({
    queryKey: [queryKeys.pendingFilms.list, params] as const,
    queryFn: ({ queryKey }) => {
      const { pageIndex, ...filters } = queryKey[1];

      return PendingFilmsApi.getPendingFilms({
        ...filters,
        skip: pageIndex ? pageIndex * PENDING_FILMS_PER_PAGE : 0,
      });
    },
  });
};
