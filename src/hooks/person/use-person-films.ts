import { useMemo } from 'react';
import { PER_PAGE } from '@/common/constants';
import { PersonRole } from '@/common/enums';
import { useFilmsContext, useActorsContext } from '@/context';
import { Values } from './types';
import { initialValues } from './initial-values';
import { findPersonFilms, getPersonData, getStatisticValues } from './helpers';
import { useQueryFilter } from '@/hooks/use-query-filter';
import { filterFilms } from '@/helpers';

const usePersonFilms = (role: PersonRole, personId: string): Values => {
  const { films } = useFilmsContext();
  const { actors } = useActorsContext();
  const { filterParams } = useQueryFilter();

  const personFilms = useMemo(() => {
    if (!films) {
      return initialValues;
    }

    const personFilms = findPersonFilms({
      role,
      currentId: personId,
      films: films,
    });

    const filteredFilms = filterFilms(personFilms, filterParams);

    const person = getPersonData(role, personId, actors ?? {});

    return {
      films: filteredFilms,
      totalFilmsCount: personFilms.length,
      person,
      pagesCount: Math.ceil(filteredFilms.length / PER_PAGE),
      genres: getStatisticValues(personFilms, 'genres'),
      years: getStatisticValues(personFilms, 'year'),
    };
  }, [films, personId, actors, filterParams]);

  return personFilms;
};

export { usePersonFilms };
