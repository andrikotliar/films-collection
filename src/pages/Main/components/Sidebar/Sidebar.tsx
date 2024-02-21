import styles from './Sidebar.module.css';
import classNames from 'classnames';
import { useSidebarContext } from '@/pages/Main/components/Sidebar/Sidebar.context';
import { Filters } from '@/pages/Main/components';
import { SlidersHorizontal } from 'lucide-react';

const Sidebar = () => {
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

export { Sidebar };
