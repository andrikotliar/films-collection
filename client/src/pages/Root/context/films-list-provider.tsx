import { FC, PropsWithChildren, useMemo } from 'react';
import { FilmsListContext } from './films-list-context';
import { useFilmsList, useQueryFilter } from '@/hooks';
import { PER_PAGE } from '@/constants';
import { countObjectKeys } from '@/helpers';

const FilmsListProvider: FC<PropsWithChildren> = ({ children }) => {
  const { filterParams } = useQueryFilter();

  const filters = useMemo(() => {
    if (countObjectKeys(filterParams) === 0) {
      return {
        limit: PER_PAGE,
        skip: 0,
      };
    }

    return {
      ...filterParams,
      limit: PER_PAGE,
      skip: filterParams.skip ? filterParams.skip * PER_PAGE : 0,
    };
  }, [filterParams]);

  const data = useFilmsList(filters);

  return (
    <FilmsListContext.Provider value={data}>
      {children}
    </FilmsListContext.Provider>
  );
};

export { FilmsListProvider };
