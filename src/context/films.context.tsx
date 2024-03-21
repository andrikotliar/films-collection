import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { filterFilms } from '@/helpers';
import { useFilter } from '@/hooks';
import { PER_PAGE } from '@/common/constants';
import { FilmData } from '@/common/types';
import { fetchAllFilms } from '@/api';

type FilmsContextType = {
  initialFilmsList: FilmData[];
  films: FilmData[];
  isFilmsLoading: boolean;
  pagesCount: number;
  filterParams: { [key: string]: any };
  updateFilter(data: any): void;
  resetFilter(): void;
};

const FilmsContext = createContext({} as FilmsContextType);

const useFilmsContext = () => useContext(FilmsContext);

const FilmsProvider: FC<PropsWithChildren> = ({ children }) => {
  const [initialFilmsList, setInitialFilmsList] = useState<FilmData[]>([]);
  const [films, setFilms] = useState<FilmData[]>([]);
  const [isFilmsLoading, setIsFilmsLoading] = useState(true);
  const [filterParams, setSearchParams] = useFilter();
  const [pagesCount, setPagesCount] = useState(0);

  const fetchFilms = async () => {
    const films = await fetchAllFilms();
    setInitialFilmsList(films);
  };

  useEffect(() => {
    fetchFilms();
  }, []);

  useEffect(() => {
    setIsFilmsLoading(true);
    if (initialFilmsList.length) {
      const { pageIndex = 0, ...params } = filterParams;
      const filteredFilms = filterFilms(initialFilmsList, params);
      const pageIndexNum = Number(pageIndex);

      const sliceStart = PER_PAGE * pageIndexNum;
      const sliceEnd = PER_PAGE * (pageIndexNum + 1);

      const films = filteredFilms.slice(sliceStart, sliceEnd);
      const pagesCount = Math.ceil(filteredFilms.length / PER_PAGE);

      setPagesCount(pagesCount);
      setFilms(films);
      setIsFilmsLoading(false);
    }
  }, [initialFilmsList, filterParams]);

  const updateFilter = (data: any) => {
    setSearchParams(data);
  };

  const resetFilter = () => {
    setSearchParams({} as URLSearchParams);
  };

  return (
    <FilmsContext.Provider
      value={{
        initialFilmsList,
        pagesCount,
        films,
        isFilmsLoading,
        filterParams,
        updateFilter,
        resetFilter,
      }}
    >
      {children}
    </FilmsContext.Provider>
  );
};

export { FilmsProvider, useFilmsContext };
