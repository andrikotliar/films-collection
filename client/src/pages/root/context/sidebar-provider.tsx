import { FC, PropsWithChildren, useState } from 'react';
import { MOBILE_VIEW_BREAKPOINT_PX } from '@/constants';
import { SidebarContext } from './sidebar-context';

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

export { SidebarProvider };
