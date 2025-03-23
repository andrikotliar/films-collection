import { LocalStorage } from '@/services';
import { useEffect } from 'react';

export const useLastVisitedFilms = (filmId: number | null) => {
  useEffect(() => {
    if (filmId) {
      const lastVisitedFilmIds =
        LocalStorage.getItem<number[]>('LAST_VISITED_FILMS');

      if (!lastVisitedFilmIds) {
        LocalStorage.setItem('LAST_VISITED_FILMS', [filmId]);
        return;
      }

      const filteredFilms = lastVisitedFilmIds.filter((id) => id !== filmId);
      const slicedFilms = filteredFilms.slice(0, 9);

      LocalStorage.setItem('LAST_VISITED_FILMS', [filmId, ...slicedFilms]);
    }
  }, [filmId]);
};
