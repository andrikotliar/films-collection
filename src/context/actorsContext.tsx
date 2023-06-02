import { FC, PropsWithChildren, createContext, useContext, useEffect, useState } from 'react';
import { Actor } from '@/types';

type ActorsContextType = {
  actors: Actor[];
}

const ActorsContext = createContext<ActorsContextType>({} as ActorsContextType);

export const useActorsContext = () => useContext(ActorsContext);

const ActorsProvider: FC<PropsWithChildren> = ({ children }) => {
  const [ actors, setActors ] = useState([]);

  const fetchActors = async () => {
    const response = await fetch('/database/actors.json');
    const actors = await response.json();
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