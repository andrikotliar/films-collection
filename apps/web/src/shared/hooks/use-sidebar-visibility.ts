import type { FilterId } from '~/shared/context';
import { useFilterContext } from '~/shared/hooks/use-filter-context';

export const useSidebarVisibility = (filterId: FilterId) => {
  const { filterId: filterIdContextValue, openFilter } = useFilterContext();
  const toggleFilter = () => {
    const isOpen = filterId === filterIdContextValue;

    document.body.style.overflow = isOpen ? 'hidden' : '';

    openFilter(isOpen ? null : filterId);
  };

  const hideFilter = () => {
    openFilter(null);

    document.body.style.overflow = '';
  };

  return {
    isFilterOpen: filterIdContextValue === filterId,
    toggleFilter,
    hideFilter,
  };
};
