import { useState } from 'react';

export const useSidebarVisibility = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const toggleFilter = () => {
    setIsFilterOpen((isOpen) => !isOpen);
  };

  const hideFilter = () => {
    setIsFilterOpen(false);
  };

  return {
    isFilterOpen,
    toggleFilter,
    hideFilter,
  };
};
