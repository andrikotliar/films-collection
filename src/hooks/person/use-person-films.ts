import { useMemo } from 'react';
import { PER_PAGE } from '@/common/constants';
import { PersonRole } from '@/common/enums';
import { useFilmsContext, useActorsContext } from '@/context';
import { Values } from './types';
import { initialValues } from './initial-values';
import { findPersonFilms, getPersonData, getStatisticValues } from './helpers';

const usePersonFilms = (role: PersonRole, personId: string): Values => {
  const { films } = useFilmsContext();
  const { actors } = useActorsContext();

  const personFilms = useMemo(() => {
    if (!films) {
      return initialValues;
    }

    const filteredFilms = findPersonFilms({
      role,
      currentId: personId,
      films: films,
    });

    const person = getPersonData(role, personId, actors ?? {});

    return {
      films: filteredFilms,
      person,
      pagesCount: Math.ceil(filteredFilms.length / PER_PAGE),
      genres: getStatisticValues(filteredFilms, 'genres'),
      years: getStatisticValues(filteredFilms, 'year'),
    };
  }, [films, personId, actors]);

  return personFilms;
};

export { usePersonFilms };
