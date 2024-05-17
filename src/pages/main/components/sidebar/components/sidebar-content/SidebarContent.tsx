import { useContext } from 'react';
import classNames from 'classnames';
import { SidebarContext } from '@/pages/main/components/sidebar/context';
import { Filters } from './components';
import { Icons } from '@/components';
import styles from './SidebarContent.module.css';

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
          <Icons icon="slider" />
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
