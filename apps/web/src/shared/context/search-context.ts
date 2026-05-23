import { createContext, useContext } from 'react';
import type { FileRoutesByTo } from '~/routeTree.gen';

type SearchContextType = {
  setSearchValue: <T extends Record<string, any>>(search: T) => void;
  clearSearchValue: (key: keyof FileRoutesByTo) => void;
  getSearchValue: (key: keyof FileRoutesByTo) => Record<string, any> | undefined;
};

export const SearchContext = createContext<SearchContextType>({
  setSearchValue: () => {},
  clearSearchValue: () => {},
  getSearchValue: () => {},
});

export const useSearchContext = () => useContext(SearchContext);
