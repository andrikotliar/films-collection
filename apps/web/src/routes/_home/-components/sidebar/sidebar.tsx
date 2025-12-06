import styles from "./sidebar.module.css";
import { useMemo, useState } from 'react';
import { SlidersHorizontalIcon } from 'lucide-react';
import clsx from 'clsx';
import { useSuspenseQuery } from '@tanstack/react-query';
import {
  fetchInitialDataQuery,
  MOBILE_VIEW_BREAKPOINT_PX,
  getFiltersConfig,
  Loader,
} from '~/shared';
import { Filters } from '../filters/filters';

export const Sidebar = () => {
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

  const { data, isLoading } = useSuspenseQuery(fetchInitialDataQuery());

  const filtersConfig = useMemo(() => {
    if (!data) {
      return [];
    }

    return getFiltersConfig(data);
  }, [data]);

  if (isLoading) {
    return (
      <div className={styles.sidebar_content}>
        <Loader />
      </div>
    );
  }

  return (
    <>
      <div
        className={clsx(styles.sidebar_content, {
          [styles.open]: isFilterOpen,
        })}
      >
        <Filters
          config={filtersConfig}
          setIsFilterOpen={setIsFilterOpen}
          updateFiltersCount={updateFiltersCount}
        />
      </div>
      <button onClick={toggleFilter} className={styles.filter_button}>
        <SlidersHorizontalIcon size={18} />
        <span>Filters</span>
        {filtersCount > 0 && <span className={styles.filter_button_badge}>{filtersCount}</span>}
      </button>
    </>
  );
};
