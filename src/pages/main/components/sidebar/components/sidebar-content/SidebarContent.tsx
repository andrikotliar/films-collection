import classNames from 'classnames';
import { SlidersHorizontal } from 'lucide-react';
import { useSidebarContext } from '@/pages/main/components/sidebar/context';
import { Filters } from './components';

import styles from './Sidebar.module.css';

const SidebarContent = () => {
  const { isFilterOpen, setIsFilterOpen, filtersCount } = useSidebarContext();

  return (
    <>
      <aside
        className={classNames(styles.sidebar, {
          [styles.open]: isFilterOpen,
        })}
      >
        <Filters />
      </aside>
      <div className={classNames(styles.actionsWrapper)}>
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className={styles.filterButton}
        >
          <SlidersHorizontal />
          <span>Filters</span>
          {filtersCount > 0 && (
            <span className={styles.filterButtonBadge}>{filtersCount}</span>
          )}
        </button>
      </div>
    </>
  );
};

export { SidebarContent };
