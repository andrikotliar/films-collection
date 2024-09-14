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
      <div
        className={classNames(styles.sidebarContent, {
          [styles.open]: isFilterOpen,
        })}
      >
        <Filters />
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

export { SidebarContent };
