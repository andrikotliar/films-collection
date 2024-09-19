import { createContext } from 'react';

type FilmsListContextType = {};

const FilmsListContext = createContext({} as FilmsListContextType);

export { FilmsListContext };
