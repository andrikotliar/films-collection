import { createContext, useContext, useEffect, useState } from 'react';

const ActorsContext = createContext();

export const useActorsContext = () => useContext(ActorsContext);

const ActorsProvider = ({ children }) => {
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