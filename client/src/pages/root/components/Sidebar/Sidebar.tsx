import styles from './Sidebar.module.css';
import { useState } from 'react';
import { SlidersHorizontalIcon } from 'lucide-react';
import classNames from 'classnames';
import { Loader } from '@/components';
import { useQuery } from '@tanstack/react-query';
import { createInitialDataQuery } from '@/queries';
import { Filters } from '../Filters/Filters';
import { MOBILE_VIEW_BREAKPOINT_PX } from '@/constants';

const Sidebar = () => {
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

  const { data, isLoading } = useQuery(createInitialDataQuery());

  if (isLoading) {
    return (
      <div className={styles.sidebarContent}>
        <Loader />
      </div>
    );
  }

  if (!data) {
    return (
      <div className={styles.sidebarContent}>
        <div className={styles.missingFilters}>Filters missing</div>
      </div>
    );
  }

  return (
    <>
      <div
        className={classNames(styles.sidebarContent, {
          [styles.open]: isFilterOpen,
        })}
      >
        <Filters
          config={data}
          setIsFilterOpen={setIsFilterOpen}
          updateFiltersCount={updateFiltersCount}
        />
      </div>
      <button onClick={toggleFilter} className={styles.filterButton}>
        <SlidersHorizontalIcon size={18} />
        <span>Filters</span>
        {filtersCount > 0 && (
          <span className={styles.filterButtonBadge}>{filtersCount}</span>
        )}
      </button>
    </>
  );
};

export { Sidebar };
