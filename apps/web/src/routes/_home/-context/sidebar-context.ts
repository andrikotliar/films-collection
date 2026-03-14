import { createContext, useContext } from 'react';

type SidebarContextType = {
  isFilterOpen: boolean;
  toggleFilter: () => void;
  hideFilter: () => void;
};

export const SidebarContext = createContext<SidebarContextType>({
  isFilterOpen: false,
  toggleFilter: () => {},
  hideFilter: () => {},
});

export const useSidebar = () => useContext(SidebarContext);
