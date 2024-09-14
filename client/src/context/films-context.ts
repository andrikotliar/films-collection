import { DataCollection } from '@/types';
import { createContext } from 'react';

type ContextValue = {
  films: DataCollection['films'];
  actors: DataCollection['actors'] | null;
};

const initialValue: ContextValue = {
  films: [],
  actors: null,
};

const FilmsContext = createContext<ContextValue>(initialValue);

export { FilmsContext };
