import { FilmsContext } from '@/context';
import { getCurrentFilm } from '@/pages/film/helpers';
import { useContext, useMemo } from 'react';

const useCurrentFilm = (id?: string) => {
  const { films } = useContext(FilmsContext);

  const currentFilm = useMemo(() => {
    if (!id || !films.length) {
      return;
    }

    return getCurrentFilm(films, id);
  }, [id, films]);

  return currentFilm;
};

export { useCurrentFilm };
