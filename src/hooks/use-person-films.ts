import { PER_PAGE } from '@/common/constants';
import { FilmData } from '@/common/types';
import { useFilmsContext } from '@/context';
import { useMemo } from 'react';

type Values = {
  films: FilmData[];
  pagesCount: number;
  genres: string[];
  years: string[];
};

const initialValues: Values = {
  films: [],
  pagesCount: 0,
  genres: [],
  years: [],
};

const filterFilms = (role: string, currentId: string, films: FilmData[]) => {
  if (role === 'actor') {
    return films.filter((film) => {
      return film.cast.find(({ actorId }) => actorId === currentId);
    });
  }

  return films.filter((film) => {
    const currentRole = film.crew.find((item) => item.role === role);

    if (!currentRole) {
      return false;
    }

    return currentRole.people.find((person) => person.name === currentId);
  });
};

const getStatisticValues = (films: FilmData[], property: 'genres' | 'year') => {
  const set = new Set<string>();

  films.forEach((film) => {
    film[property].forEach((value) => set.add(String(value)));
  });

  return Array.from(set);
};

const usePersonFilms = (role: string, personId: string): Values => {
  const { initialFilmsList } = useFilmsContext();

  const personFilms = useMemo(() => {
    if (!initialFilmsList) {
      return initialValues;
    }

    const films = filterFilms(role, personId, initialFilmsList);

    return {
      films,
      pagesCount: Math.ceil(films.length / PER_PAGE),
      genres: getStatisticValues(films, 'genres'),
      years: getStatisticValues(films, 'year'),
    };
  }, [initialFilmsList, personId]);

  return personFilms;
};

export { usePersonFilms };
