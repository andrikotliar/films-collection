import { FC, PropsWithChildren } from 'react';
import { fetchData } from '@/api';
import { Loader, NotFound } from '@/components';
import { useQuery } from '@/hooks/query';
import { FilmsContext } from './films-context';

const FilmsProvider: FC<PropsWithChildren> = ({ children }) => {
  const { data, isFetching } = useQuery({
    fn: fetchData,
  });

  if (isFetching) {
    return <Loader isFullPage />;
  }

  if (!data) {
    return <NotFound message="Data not found. Reload the page" />;
  }

  return <FilmsContext.Provider value={data}>{children}</FilmsContext.Provider>;
};

export { FilmsProvider };
