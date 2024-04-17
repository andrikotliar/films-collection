import { useMemo } from 'react';
import { PER_PAGE } from '@/common/constants';
import { PersonRole } from '@/common/enums';
import { useActorsContext, useFilmsContext } from '@/context';
import {
  Values,
  initialValues,
  filterFilms,
  getPersonData,
  getStatisticValues,
} from './person';

const usePersonFilms = (role: PersonRole, personId: string): Values => {
  const { initialFilmsList } = useFilmsContext();
  const { actors } = useActorsContext();

  const personFilms = useMemo(() => {
    if (!initialFilmsList) {
      return initialValues;
    }

    const films = filterFilms({
      role,
      currentId: personId,
      films: initialFilmsList,
    });

    const person = getPersonData(role, personId, actors ?? {});

    return {
      films,
      person,
      pagesCount: Math.ceil(films.length / PER_PAGE),
      genres: getStatisticValues(films, 'genres'),
      years: getStatisticValues(films, 'year'),
    };
  }, [initialFilmsList, personId, actors]);

  return personFilms;
};

export { usePersonFilms };
