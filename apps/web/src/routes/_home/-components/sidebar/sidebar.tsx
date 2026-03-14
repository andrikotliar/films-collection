import styles from './sidebar.module.css';
import { useMemo } from 'react';
import clsx from 'clsx';
import { getFiltersConfig, Loader, getInitialDataQueryOptions } from '~/shared';
import { Filters } from '../filters/filters';
import { useQuery } from '@tanstack/react-query';
import { useSidebar } from '~/routes/_home/-context';

export const Sidebar = () => {
  const { isFilterOpen } = useSidebar();

  const { data, isLoading } = useQuery(getInitialDataQueryOptions());

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
    <div
      className={clsx(styles.sidebar_content, {
        [styles.open]: isFilterOpen,
      })}
    >
      <Filters config={filtersConfig} />
    </div>
  );
};
