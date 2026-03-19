import { useState } from 'react';

export const useSidebarVisibility = () => {
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

  return {
    isFilterOpen,
    toggleFilter,
    hideFilter,
  };
};
