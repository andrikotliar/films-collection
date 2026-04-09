import { useState } from 'react';

export const useSidebarVisibility = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const toggleFilter = () => {
    const isOpen = !isFilterOpen;

    document.body.style.overflow = isOpen ? 'hidden' : '';

    setIsFilterOpen(isOpen);
  };

  const hideFilter = () => {
    setIsFilterOpen(false);

    document.body.style.overflow = '';
  };

  return {
    isFilterOpen,
    toggleFilter,
    hideFilter,
  };
};
