import { useMemo } from 'react';
import { useFilmsContext } from '@/context';
import { countObjectKeys, filterFilms } from '@/helpers';
import { useQueryFilter } from '@/hooks/use-query-filter';
import { paginateFilms } from './helpers';

const useFilteredFilms = () => {
  const { films } = useFilmsContext();
  const { filterParams } = useQueryFilter();

  const result = useMemo(() => {
    if (films?.length) {
      const filtersCount = countObjectKeys(filterParams);

      if (filtersCount) {
        const { pageIndex = 0, ...params } = filterParams;
        const filteredFilms = filterFilms(films, params);

        return paginateFilms(filteredFilms, Number(pageIndex));
      }

      return paginateFilms(films, 0);
    }

    return {
      paginatedFilms: [],
      pagesCount: 0,
    };
  }, [films, filterParams]);

  return {
    films: result.paginatedFilms,
    pagesCount: result.pagesCount,
  };
};

export { useFilteredFilms };
