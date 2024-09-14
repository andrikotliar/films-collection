import { LocalStorageKey } from '@/enums';
import { useEffect } from 'react';

const useLastVisitedFilms = (id?: string) => {
  useEffect(() => {
    if (!id) {
      return;
    }

    const lastVisitedFilmIds = localStorage.getItem(
      LocalStorageKey.LAST_VISITED_FILMS,
    );

    if (!lastVisitedFilmIds) {
      localStorage.setItem(
        LocalStorageKey.LAST_VISITED_FILMS,
        JSON.stringify([id]),
      );
      return;
    }

    const filmIds: string[] = JSON.parse(lastVisitedFilmIds);

    const filteredIds = filmIds.filter((filmId) => filmId !== id);
    const slicedIds = filteredIds.slice(0, 9);

    localStorage.setItem(
      LocalStorageKey.LAST_VISITED_FILMS,
      JSON.stringify([id, ...slicedIds]),
    );
  }, [id]);
};

export { useLastVisitedFilms };
