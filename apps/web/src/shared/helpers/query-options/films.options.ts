import { queryOptions } from '@tanstack/react-query';
import { getEmbeddableYoutubeUrl } from '~/shared/helpers/get-embeddable-youtube-url';
import { isNewItem } from '~/shared/helpers/is-new-item';
import { api, queryKey } from '~/shared/services';
import type { MixedId, QueryParams } from '~/shared/types';

export const buildGetAdminFilmDetailsQueryOptions = (id: MixedId) => {
  return queryOptions({
    queryKey: queryKey('films.getEditableFilm', id),
    queryFn: () => {
      if (isNewItem(id)) {
        return null;
      }

      return api.films.getEditableFilm({ params: { id } });
    },
    enabled: !isNewItem(id),
  });
};

export const buildGetFilmByCollectionNameAndOrderQueryOptions = (title: string) => {
  return queryOptions({
    queryKey: queryKey('films.getFilmByCollectionName'),
    queryFn: () => api.films.getFilmByCollectionName({ queryParams: { title } }),
  });
};

export const buildGetFilmDraftsQueryOptions = (filmId: string) => {
  return queryOptions({
    queryKey: queryKey('films.getFilmDrafts', filmId),
    queryFn: async () => {
      return api.films.getFilmDrafts({ params: { filmId } });
    },
  });
};

export const buildGetFilmQueryOptions = (filmId: number) => {
  return queryOptions({
    queryKey: ['filmQuery', ...queryKey('films.getById', filmId)],
    queryFn: () => api.films.getById({ params: { id: filmId } }),
    staleTime: Infinity,
  });
};

export const buildGetAdminFilmQueryOptions = (filmId: number) => {
  return queryOptions({
    queryKey: ['filmQuery', ...queryKey('films.getAdminFilmById', filmId)],
    queryFn: () => api.films.getAdminFilmById({ params: { id: filmId } }),
    staleTime: Infinity,
  });
};

export const buildGetFilmTrailersQueryOptions = (id: number | null) => {
  return queryOptions({
    queryKey: queryKey('films.getTrailers', id),
    queryFn: async () => {
      if (!id) {
        return null;
      }

      const { trailers } = await api.films.getTrailers({ params: { id } });

      const firstTrailerUrl = trailers[0]?.url;

      if (!firstTrailerUrl) {
        return null;
      }

      const videoParams = getEmbeddableYoutubeUrl(firstTrailerUrl, {
        rel: '0',
        showinfo: '0',
        autoplay: '1',
      });

      return videoParams.value;
    },
    enabled: !!id,
  });
};

export const buildGetFilmsAdminListQueryOptions = (
  queryParams: QueryParams<typeof api.films.getAdminList>,
) => {
  return queryOptions({
    queryKey: queryKey('films.getAdminList', queryParams),
    queryFn: () => api.films.getAdminList({ queryParams }),
  });
};

export const buildGetFilmsByCollectionQueryOptions = (collectionId: MixedId) => {
  return queryOptions({
    queryKey: queryKey('films.getByCollection', collectionId),
    queryFn: async () => {
      if (isNewItem(collectionId)) {
        return;
      }

      return await api.films.getByCollection({ params: { id: collectionId } });
    },
    enabled: !!collectionId && !isNewItem(collectionId),
  });
};

export const buildGetFilmsListQueryOptions = (
  queryParams: QueryParams<typeof api.films.getList>,
) => {
  return queryOptions({
    queryKey: queryKey('films.getList', queryParams),
    queryFn: () => api.films.getList({ queryParams }),
  });
};

export const buildGetFilmsSearchQueryOptions = (searchString: string | null) => {
  return queryOptions({
    queryKey: queryKey('films.search', searchString),
    queryFn: async () => {
      if (!searchString) {
        return null;
      }

      return await api.films.search({ queryParams: { q: searchString } });
    },
    enabled: !!searchString?.length,
  });
};

export const buildGetFilmsStatsQueryOptions = () => {
  return queryOptions({
    queryKey: queryKey('films.getFilmStats'),
    queryFn: api.films.getFilmStats,
    staleTime: Infinity,
  });
};
