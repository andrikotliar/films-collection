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
  updateFilter(data: any, dirtyFields: any): void;
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
    if (loadedFilmsNumber > FILMS_COUNT_STEP) {
      setFilms(
        initialFilmsList.slice(0, loadedFilmsNumber),
      );
    }
  }, [loadedFilmsNumber]);

  useEffect(() => {
    if (initialFilmsList.length) {
      const filteredFilms = filterFilms(
        initialFilmsList,
        filterParams,
      );
      setFilms(filteredFilms.slice(0, FILMS_COUNT_STEP));
      setLoadedFilmsNumber(FILMS_COUNT_STEP);
      setIsFilmsLoading(false);
    }
  }, [initialFilmsList, filterParams]);

  const updateFilter = (data: any, dirtyFields: any) => {
    const params = {
      ...filterParams,
    };
    Object.keys(dirtyFields).forEach(field => {
      params[field] = data[field];
    });
    setSearchParams(params);
  };

  const resetFilter = () => {
    setSearchParams({});
  };

  return (
    <FilmsContext.Provider
      value={{
        initialFilmsList,
        films,
        isFilmsLoading,
        filterParams,
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
