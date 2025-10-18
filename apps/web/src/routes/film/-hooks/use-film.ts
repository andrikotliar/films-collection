import { fetchFilmQuery } from '~/common';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getRouteApi } from '@tanstack/react-router';

const routeApi = getRouteApi('/film/$id');

export const useFilm = () => {
  const { id } = routeApi.useParams();
  const { data } = useSuspenseQuery(fetchFilmQuery(id));

  return data;
};
