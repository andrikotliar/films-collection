import { FilmData } from '@/common/types';
import { useMemo } from 'react';

const useRandomFilmIndexes = (films: FilmData[]) => {
  const randomFilms = useMemo(() => {
    if (!films.length) {
      return [];
    }

    const count = films.length;
    const uniqueRandomIndexes = new Set<number>();

    while (uniqueRandomIndexes.size < 10) {
      const randomIndex = Math.floor(Math.random() * count);
      uniqueRandomIndexes.add(randomIndex);
    }

    return Array.from(uniqueRandomIndexes);
  }, [films]);

  return randomFilms;
};

export { useRandomFilmIndexes };
