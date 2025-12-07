import { useSuspenseQuery } from '@tanstack/react-query';
import { useParams } from '@tanstack/react-router';
import { fetchFilmQuery } from '~/shared';

export const useFilm = () => {
  const params = useParams({ from: '/films/$id' });

  return useSuspenseQuery(fetchFilmQuery(params.id));
};
