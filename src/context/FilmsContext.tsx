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
import { FilmData } from '@/common';
import { FilmAPI } from '@/api';

type FilmsContextType = {
  initialFilmsList: FilmData[];
  films: FilmData[];
  isFilmsLoading: boolean;
  filterParams: { [key: string]: any };
  loadedFilmsNumber: number;
  filmsCount: number;
  updateFilter(data: any): void;
  setLoadedFilmsNumber: Dispatch<SetStateAction<number>>;
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
  const [filmsCount, setFilmsCount] = useState(
    initialFilmsList.length,
  );
  const [loadedFilmsNumber, setLoadedFilmsNumber] =
    useState(FILMS_COUNT_STEP);

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
      setFilmsCount(filteredFilms.length);
      const startFilms = filteredFilms.slice(
        0,
        loadedFilmsNumber,
      );
      setFilms(startFilms);
      setIsFilmsLoading(false);
    }
  }, [initialFilmsList, filterParams, loadedFilmsNumber]);

  const updateFilter = (data: any) => {
    setSearchParams(data);
  };

  const resetFilter = () => {
    setSearchParams({});
    setLoadedFilmsNumber(FILMS_COUNT_STEP);
  };

  return (
    <FilmsContext.Provider
      value={{
        initialFilmsList,
        films,
        isFilmsLoading,
        filterParams,
        loadedFilmsNumber,
        filmsCount,
        updateFilter,
        resetFilter,
        setLoadedFilmsNumber,
      }}
    >
      {children}
    </FilmsContext.Provider>
  );
};

export { FilmsProvider, useFilmsContext };
