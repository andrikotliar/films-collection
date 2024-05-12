import { DataCollection, fetchData } from '@/api';
import { Loader, NotFound } from '@/components';
import { useQuery } from '@/hooks/query';
import { FC, PropsWithChildren, createContext, useContext } from 'react';

type InitialValue = {
  films: DataCollection['films'];
  actors: DataCollection['actors'] | null;
};

const initialValue: InitialValue = {
  films: [],
  actors: null,
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
