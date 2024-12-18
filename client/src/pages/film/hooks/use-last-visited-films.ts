import { LocalStorageKey } from '@/enums';
import { FilmData, FilmLinkItem } from '@/types';
import { useEffect } from 'react';

export const useLastVisitedFilms = (film?: FilmData | null) => {
  useEffect(() => {
    if (!film) {
      return;
    }

    const lastVisitedFilms = localStorage.getItem(
      LocalStorageKey.LAST_VISITED_FILMS,
    );

    if (!lastVisitedFilms) {
      localStorage.setItem(
        LocalStorageKey.LAST_VISITED_FILMS,
        JSON.stringify([{ _id: film._id, title: film.title }]),
      );
      return;
    }

    const films: FilmLinkItem[] = JSON.parse(lastVisitedFilms);

    const filteredFilms = films.filter(
      (localFilm) => localFilm._id !== film._id,
    );
    const slicedFilms = filteredFilms.slice(0, 9);

    localStorage.setItem(
      LocalStorageKey.LAST_VISITED_FILMS,
      JSON.stringify([{ _id: film._id, title: film.title }, ...slicedFilms]),
    );
  }, [film]);
};
