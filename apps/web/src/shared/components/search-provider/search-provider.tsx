import { useRef } from 'react';
import type { FileRoutesByTo } from '~/routeTree.gen';
import { SearchContext } from '~/shared/context';

type SearchProviderProps = {
  children: React.ReactNode;
};

type SearchContextRef = Partial<Record<keyof FileRoutesByTo, Record<string, any>>>;

export const SearchProvider = ({ children }: SearchProviderProps) => {
  const searchStorageRef = useRef<SearchContextRef>({});
  const setSearchValue = <T extends Record<string, any>>(search: T) => {
    searchStorageRef.current[window.location.pathname as keyof FileRoutesByTo] = search;
  };

  const clearSearchValue = (path: keyof FileRoutesByTo) => {
    delete searchStorageRef.current[path];
  };

  const getSearchValue = (path: keyof FileRoutesByTo) => {
    return searchStorageRef.current[path];
  };

  return (
    <SearchContext.Provider value={{ setSearchValue, clearSearchValue, getSearchValue }}>
      {children}
    </SearchContext.Provider>
  );
};
