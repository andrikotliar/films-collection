import { MOBILE_VIEW_BREAKPOINT_PX } from '@/common/constants';
import {
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';

type SidebarContextType = {
  isFilterOpen: boolean;
  filtersCount: number;
  setIsFilterOpen: Dispatch<SetStateAction<boolean>>;
  updateFiltersCount: (count: number) => void;
  toggleFilter: VoidFunction;
};

const SidebarContext = createContext({} as SidebarContextType);

const useSidebarContext = () => useContext(SidebarContext);

const SidebarProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filtersCount, setFiltersCount] = useState(0);

  const updateFiltersCount = (count: number) => {
    if (document.documentElement.clientWidth <= MOBILE_VIEW_BREAKPOINT_PX) {
      setFiltersCount(count);
    }
  };

  const toggleFilter = () => {
    setIsFilterOpen((isOpen) => !isOpen);
  };

  return (
    <SidebarContext.Provider
      value={{
        isFilterOpen,
        setIsFilterOpen,
        filtersCount,
        updateFiltersCount,
        toggleFilter,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export { SidebarProvider, useSidebarContext };
