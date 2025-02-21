import { LocalStorageKey } from '@/enums';
import { useEffect } from 'react';

export const useLastVisitedFilms = (filmId: number | null) => {
  useEffect(() => {
    if (filmId) {
      const lastVisitedFilms = localStorage.getItem(
        LocalStorageKey.LAST_VISITED_FILMS,
      );

      if (!lastVisitedFilms) {
        localStorage.setItem(
          LocalStorageKey.LAST_VISITED_FILMS,
          JSON.stringify([filmId]),
        );
        return;
      }

      const filmIds: number[] = JSON.parse(lastVisitedFilms);

      const filteredFilms = filmIds.filter((id) => id !== filmId);
      const slicedFilms = filteredFilms.slice(0, 9);

      localStorage.setItem(
        LocalStorageKey.LAST_VISITED_FILMS,
        JSON.stringify([filmId, ...slicedFilms]),
      );
    }
  }, [filmId]);
};
