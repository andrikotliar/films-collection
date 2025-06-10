import { LocalStorage } from '@/services';
import { useEffect } from 'react';

export const useLastVisitedFilms = (filmId: number | null) => {
  useEffect(() => {
    if (filmId) {
      const lastVisitedFilmIds =
        LocalStorage.getItem<number[]>('films:last_visited');

      if (!lastVisitedFilmIds) {
        LocalStorage.setItem('films:last_visited', [filmId]);
        return;
      }

      const filteredFilms = lastVisitedFilmIds.filter((id) => id !== filmId);
      const slicedFilms = filteredFilms.slice(0, 9);

      LocalStorage.setItem('films:last_visited', [filmId, ...slicedFilms]);
    }
  }, [filmId]);
};
