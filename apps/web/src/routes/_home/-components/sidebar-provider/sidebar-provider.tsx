import { useState } from 'react';
import { SidebarContext } from '~/routes/_home/-context';

export const SidebarProvider = ({ children }: { children: React.ReactNode }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const toggleFilter = () => {
    const nextIsOpen = !isFilterOpen;

    document.body.style.overflow = nextIsOpen ? 'hidden' : '';
    setIsFilterOpen(nextIsOpen);
  };

  const hideFilter = () => {
    document.body.style.overflow = '';
    setIsFilterOpen(false);
  };

  return (
    <SidebarContext.Provider value={{ isFilterOpen, toggleFilter, hideFilter }}>
      {children}
    </SidebarContext.Provider>
  );
};
