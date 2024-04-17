import { FC, PropsWithChildren, createContext, useContext } from 'react';
import { useQuery } from '@/hooks/query';
import { fetchAllFilms, fetchRelatedFilmsList } from '@/api';
import { FilmData, Related } from '@/common/types';

type InitialValue = {
  films: FilmData[] | null;
  relatedFilms: Related | null;
  isFilmsFetching: boolean;
};

const initialValue: InitialValue = {
  films: null,
  relatedFilms: null,
  isFilmsFetching: true,
};

const FilmsContext = createContext<InitialValue>(initialValue);

const useFilmsContext = () => useContext(FilmsContext);

const FilmsProvider: FC<PropsWithChildren> = ({ children }) => {
  const { data: films, isFetching } = useQuery({
    fn: fetchAllFilms,
  });

  const { data: relatedFilms } = useQuery({
    fn: fetchRelatedFilmsList,
  });

  return (
    <FilmsContext.Provider
      value={{ films, relatedFilms, isFilmsFetching: isFetching }}
    >
      {children}
    </FilmsContext.Provider>
  );
};

export { FilmsProvider, useFilmsContext };
