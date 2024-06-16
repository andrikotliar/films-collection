import { useContext } from 'react';
import classNames from 'classnames';
import { SidebarContext } from '@/pages/main/components/sidebar/context';
import { Filters } from './components';
import styles from './SidebarContent.module.css';
import { SlidersHorizontalIcon } from 'lucide-react';

const SidebarContent = () => {
  const { isFilterOpen, toggleFilter, filtersCount } =
    useContext(SidebarContext);

  return (
    <>
      <aside
        className={classNames(styles.sidebarContent, {
          [styles.open]: isFilterOpen,
        })}
      >
        <Filters />
      </aside>
      <div className={classNames(styles.actionsWrapper)}>
        <button onClick={toggleFilter} className={styles.filterButton}>
          <SlidersHorizontalIcon />
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
