import { Dispatch, SetStateAction, createContext } from 'react';

type SidebarContextType = {
  isFilterOpen: boolean;
  filtersCount: number;
  setIsFilterOpen: Dispatch<SetStateAction<boolean>>;
  updateFiltersCount: (count: number) => void;
  toggleFilter: VoidFunction;
};

const SidebarContext = createContext({} as SidebarContextType);

export { SidebarContext };
