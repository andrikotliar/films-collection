import { useMemo } from 'react';
import { useDataContext } from '@/context';
import { countObjectKeys } from '@/helpers';
import { useQueryFilter } from '@/hooks/use-query-filter';
import { paginateFilms, filterFilms } from './helpers';

const useFilteredFilms = () => {
  const { films } = useDataContext();
  const { filterParams } = useQueryFilter();

  const result = useMemo(() => {
    if (films.length) {
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
