import { useContext } from 'react';
import { SlidersHorizontalIcon } from 'lucide-react';
import classNames from 'classnames';
import { SidebarContext } from '@/pages/Root/context';
import { Filters } from '../Filters/Filters';
import styles from './Sidebar.module.css';
import { useInitialData } from '@/hooks';
import { Loader } from '@/components';

const Sidebar = () => {
  const { isFilterOpen, toggleFilter, filtersCount } =
    useContext(SidebarContext);

  const { data, isLoading } = useInitialData();

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
        <Filters config={data} />
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
