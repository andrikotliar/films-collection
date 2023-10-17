import {
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { filterFilms } from '@/helpers';
import { useFilter } from '@/hooks';
import { FILMS_COUNT_STEP } from '@/common/constants';
import { DynamicObject, FilmData } from '@/common';
import { FilmAPI } from '@/api';

type FilmsContextType = {
  initialFilmsList: FilmData[];
  films: FilmData[];
  isFilmsLoading: boolean;
  filterParams: DynamicObject;
  filmsCount: number;
  hasMore: boolean;
  updateFilter(data: any): void;
  setFilmsCount: Dispatch<SetStateAction<number>>;
  resetFilter(): void;
};

const FilmsContext = createContext({} as FilmsContextType);

const useFilmsContext = () => useContext(FilmsContext);

const FilmsProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const [initialFilmsList, setInitialFilmsList] = useState<
    FilmData[]
  >([]);
  const [films, setFilms] = useState<FilmData[]>([]);
  const [isFilmsLoading, setIsFilmsLoading] =
    useState(true);
  const [filterParams, setSearchParams] = useFilter();
  const [hasMore, setHasMore] = useState(true);
  const [filmsCount, setFilmsCount] = useState(
    FILMS_COUNT_STEP,
  );

  const fetchFilms = async () => {
    const films = await FilmAPI.getAll();
    setInitialFilmsList(films);
  };

  useEffect(() => {
    fetchFilms();
  }, []);

  useEffect(() => {
    if (initialFilmsList.length) {
      const filteredFilms = filterFilms(
        initialFilmsList,
        filterParams,
      );

      const films = filteredFilms.slice(0, filmsCount);

      setFilms(films);

      if (films.length === initialFilmsList.length) {
        setHasMore(false);
      }

      setIsFilmsLoading(false);
    }
  }, [initialFilmsList, filterParams, filmsCount]);

  const updateFilter = (data: any) => {
    setSearchParams(data);
  };

  const resetFilter = () => {
    setSearchParams({});
    setFilmsCount(FILMS_COUNT_STEP);
    setHasMore(true);
  };

  return (
    <FilmsContext.Provider
      value={{
        initialFilmsList,
        films,
        isFilmsLoading,
        filterParams,
        filmsCount,
        hasMore,
        updateFilter,
        resetFilter,
        setFilmsCount,
      }}
    >
      {children}
    </FilmsContext.Provider>
  );
};

export { FilmsProvider, useFilmsContext };
