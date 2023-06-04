import { FC, PropsWithChildren, createContext, useContext, useEffect, useState } from 'react';
import { Actor } from '@/types';
import { ActorsAPI } from '@/api';

type ActorsContextType = {
  actors: Actor[];
};

const ActorsContext = createContext<ActorsContextType>({} as ActorsContextType);

export const useActorsContext = () => useContext(ActorsContext);

const ActorsProvider: FC<PropsWithChildren> = ({ children }) => {
  const [ actors, setActors ] = useState<Actor[]>([]);

  const fetchActors = async () => {
    const actors = await ActorsAPI.getAll();
    setActors(actors);
  }

  useEffect(() => {
    fetchActors();
  }, []);

  return (
    <ActorsContext.Provider value={{
      actors
    }}>
      {children}
    </ActorsContext.Provider>
  );
};

export default ActorsProvider;