import { fetchAllFilms, fetchRelatedFilmsList, fetchActorsList } from '@/api';
import { ActorsList, FilmData, Related } from '@/common/types';
import { Loader, NotFound } from '@/components';
import { useQuery } from '@/hooks/query';
import { FC, PropsWithChildren, createContext, useContext } from 'react';

type InitialValue = {
  films: FilmData[] | null;
  relatedFilms: Related | null;
  actors: ActorsList | null;
};

const initialValue: InitialValue = {
  films: null,
  relatedFilms: null,
  actors: null,
};

const fetchData = async () => {
  const films = await fetchAllFilms();
  const relatedFilms = await fetchRelatedFilmsList();
  const actors = await fetchActorsList();

  return {
    films,
    relatedFilms,
    actors,
  };
};

const DataContext = createContext<InitialValue>(initialValue);

const useDataContext = () => useContext(DataContext);

const DataProvider: FC<PropsWithChildren> = ({ children }) => {
  const { data, isFetching } = useQuery({
    fn: fetchData,
  });

  if (isFetching) {
    return <Loader isFullPage />;
  }

  if (!data) {
    return <NotFound message="Data not found. Reload the page" />;
  }

  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
};

export { DataProvider, useDataContext };
