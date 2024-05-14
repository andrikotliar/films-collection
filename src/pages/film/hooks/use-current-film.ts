import { useDataContext } from '@/context';
import { getCurrentFilm } from '@/pages/film/helpers';
import { useMemo } from 'react';

const useCurrentFilm = (id?: string) => {
  const { films } = useDataContext();

  const currentFilm = useMemo(() => {
    if (!id || !films.length) {
      return;
    }

    return getCurrentFilm(films, id);
  }, [id, films]);

  return currentFilm;
};

export { useCurrentFilm };
