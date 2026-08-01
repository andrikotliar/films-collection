import { createContext } from 'react';
import type { FileRoutesByTo } from '~/routeTree.gen';

export type FilterId = keyof FileRoutesByTo;

type FilterContextType = {
  filterId: FilterId | null;
  openFilter: (id: FilterId | null) => void;
};

export const FilterContext = createContext<FilterContextType>({
  filterId: null,
  openFilter: () => {},
});
