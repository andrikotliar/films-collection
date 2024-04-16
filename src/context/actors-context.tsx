import { getActorsList } from '@/api';
import { ActorsList } from '@/common/types';
import { useQuery } from '@/hooks/query';
import { FC, PropsWithChildren, createContext, useContext } from 'react';

type InitialValue = {
  actors: ActorsList | null;
};

const initialValue: InitialValue = {
  actors: null,
};

const ActorsContext = createContext(initialValue);

const useActorsContext = () => useContext(ActorsContext);

const ActorsProvider: FC<PropsWithChildren> = ({ children }) => {
  const { data } = useQuery({
    fn: getActorsList,
  });

  return (
    <ActorsContext.Provider value={{ actors: data }}>
      {children}
    </ActorsContext.Provider>
  );
};

export { ActorsProvider, useActorsContext };
