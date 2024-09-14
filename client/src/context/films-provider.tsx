import { FC, PropsWithChildren } from 'react';
import { Loader, NotFound } from '@/components';
import { FilmsContext } from './films-context';
import { useData } from '@/hooks';

const FilmsProvider: FC<PropsWithChildren> = ({ children }) => {
  const { data, isFetching } = useData();

  if (isFetching) {
    return <Loader isFullPage />;
  }

  if (!data) {
    return <NotFound message="Data not found. Reload the page" />;
  }

  return <FilmsContext.Provider value={data}>{children}</FilmsContext.Provider>;
};

export { FilmsProvider };
